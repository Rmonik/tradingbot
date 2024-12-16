import { inject, injectable } from "inversify";
import { ISimulationResult } from "./types.js";
import { SimulationResultsRepository } from "./SimulationResultsRepository.js";
import { IBalance, TradingAlgorithm } from "../../trading/types.js";
import { IPricePoint, ResolutionMode } from "../../core/types.js";
import { SimulationConfigProvider } from "../SimulationConfigProvider.js";
import { SimulationPricesRepository } from "../SimulationPricesRepository.js";
import { ITaxCalculationResult, TaxMethod } from "../../tax/types.js";
import { TimeUnit } from "../../utils/types.js";
import { addTime } from "../../utils/TimeUtils.js";
import { UserRepository } from "../../users/UserRepository.js";
import { isDefined } from "../../utils/TypeUtils.js";
import { TaxCalculator } from "../../tax/TaxCalculator.js";
import { TransactionRepository } from "../../transactions/TransactionRepository.js";
import { IAlgorithmConfig, ITradingAlgorithm, ITransaction, TransactionType } from "../../transactions/types.js";
import { ContainerIdentifiers } from "../../core/Container/ContainerIdentifiers.js";
import { ISimulationInterval } from "../types.js";


@injectable()
export class SimulationResultsService {

    public constructor(
        private readonly simulationResultsRepository: SimulationResultsRepository,
        private readonly simulationConfigProvider: SimulationConfigProvider,
        private readonly simulationPricesRepository: SimulationPricesRepository,
        private readonly usersRepository: UserRepository,
        private readonly taxCalculator: TaxCalculator,
        private readonly transactionsRepository: TransactionRepository,
        @inject(ContainerIdentifiers.TradingAlgorithmName) private readonly tradingAlgorithmName: TradingAlgorithm,
        @inject(ContainerIdentifiers.TradingAlgorithm) private readonly tradingAlgorithm: ITradingAlgorithm,
        @inject(ContainerIdentifiers.ResulotionMode) private readonly resolutionMode: ResolutionMode,
    ) { }

    public async finalizeResults(userId: string): Promise<ISimulationResult> {
        // Fetch all the data
        const interval = this.simulationConfigProvider.getSimulationInterval();
        const firstPricePoint = await this.simulationPricesRepository.getNextPricePointAfterDate(this.simulationConfigProvider.getAsset(), addTime(interval.start, -1, TimeUnit.Milliseconds));
        if(!isDefined(firstPricePoint)) throw new Error("Could not find first price point");
        const lastPricePoint = await this.simulationPricesRepository.getNextPricePointAfterDate(this.simulationConfigProvider.getAsset(), addTime(interval.end, -1, TimeUnit.Milliseconds));
        if(!isDefined(lastPricePoint)) throw new Error("Could not find last price point");
        const initialBalance = this.simulationConfigProvider.getInitialBalance();
        const user = await this.usersRepository.findById(userId);
        if(!isDefined(user)) throw new Error("Could not find user");
        const transactions = await this.transactionsRepository.getAllTransactions(userId);
        const taxResult = this.taxCalculator.calculateTax(transactions);

        // Calculate the results
        const result = this.calculateSimulationResults(initialBalance, user.balance, firstPricePoint, lastPricePoint, transactions, taxResult, this.tradingAlgorithmName, this.tradingAlgorithm.describeAlgorithm(), this.simulationConfigProvider.getSimulationInterval(), this.tradingAlgorithm.config);

        // Store the results
        await this.simulationResultsRepository.insert(result);

        // Prune the other simulation data data
        await this.pruneSimulationData(user.id);

        return result;
    }

    private calculateSimulationResults(initialBalance: IBalance, finalBalance: IBalance, pricePointFirst: IPricePoint, pricePointLast: IPricePoint, transactions: ITransaction[], taxResult: ITaxCalculationResult, tradingAlgorithmName: TradingAlgorithm, tradingAlgorithmDescription: string, simulationInterval: ISimulationInterval, algorithmConfig: IAlgorithmConfig): ISimulationResult {
        const valueOnDayOne = initialBalance.fiat + (initialBalance.wallet * pricePointFirst.price);
        const valueOnLastDay = finalBalance.fiat + (finalBalance.wallet * pricePointLast.price);
        const totalAssetsIfHodl = initialBalance.wallet + (initialBalance.fiat / pricePointFirst.price);
        const valueOnLastDayIfHodl = totalAssetsIfHodl * pricePointLast.price * (1 - this.simulationConfigProvider.getFee().taker * 2);
        const holdFactor = valueOnLastDayIfHodl / valueOnDayOne;

        return {
            finalBalance: {
                wallet: finalBalance.wallet,
                fiat: finalBalance.fiat,
                valueOnFinalDay: valueOnLastDay,
                valueIncreaseFactor: valueOnLastDay / valueOnDayOne,
                holdIncreaseFactor: holdFactor,
                valueIncreaseComparedToHodlFactor: valueOnLastDay / valueOnLastDayIfHodl,
            },
            taxes: {
                taxableProfit: taxResult.taxableProfit,
                taxAmount: taxResult.taxAmount,
                taxMethod: taxResult.taxMethod,
            },
            algorithm: {
                name: tradingAlgorithmName,
                description: tradingAlgorithmDescription,
                config: algorithmConfig,
            },
            transactions: {
                totalAmount: transactions.length,
                buysAmount: transactions.filter(transaction => transaction.type === TransactionType.BUY).length,
                sellsAmount: transactions.filter(transaction => transaction.type === TransactionType.SELL).length,
            },
            period: simulationInterval,

        }
    }

    private async pruneSimulationData(userId: string): Promise<void> {
        if(this.resolutionMode !== ResolutionMode.Simulation) throw new Error("Warning: Trying to run simulation clean up in production mode. Nothing was deleted");
        await this.transactionsRepository.deleteAllButFromUser(userId);
        await this.usersRepository.deleteAll();
    }

    
} 