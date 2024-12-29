import { ITransaction, IOrder, TransactionType } from "../../transactions/types.js";
import { isDefined } from "../../utils/TypeUtils.js";
import { IAlgorithm, IAlgorithmConfig } from "../types.js";
import { getLastTransaction, howManyBuysSinceLastSell, howManySellsSinceLastBuy } from "../utils.js";
import { DynamicBuyLowSellHighV1ConfigProvider } from "./DynamicBuyLowSellHighV1ConfigProvider.js";
import { DynamicBuyLowSellHighV1Config } from "./types.js";


export class DynamicBuyLowSellHighV1Algorithm implements IAlgorithm {

    public constructor(
        private readonly configProvider: DynamicBuyLowSellHighV1ConfigProvider,
    ) { }



    getConfig(): DynamicBuyLowSellHighV1Config {
        return this.configProvider.getConfig();
    }
    determineTransaction(currentPrice: number, wallet: number, fiat: number, transactionHistory: ITransaction[]): IOrder | null {
        const lastTransaction = getLastTransaction(transactionHistory);
        // Initial buy
        if(!isDefined(lastTransaction)) return {
            type: TransactionType.BUY,
            amount: fiat * this.getConfig().initialBuyIn / currentPrice,
        }
    
        // Sell
        if(currentPrice > lastTransaction.price * (1 + this.getConfig().sellTreshold)) {
            const sellsSinceLastBuy = howManySellsSinceLastBuy(transactionHistory);
            return {
                type: TransactionType.SELL,
                amount: wallet * Math.min(this.getConfig().sellAmountBase * (sellsSinceLastBuy + 1), this.getConfig().sellAmountMax),
            }
        }
        
        if(currentPrice < lastTransaction.price * (1 - this.getConfig().buyTreshold)) {
            const sellsSinceLastBuy = howManyBuysSinceLastSell(transactionHistory);
            return {
                type: TransactionType.BUY,
                amount: (fiat * Math.min(this.getConfig().buyAmountBase * (sellsSinceLastBuy + 1), this.getConfig().buyAmountMax)) / currentPrice,
            }
        }
    
        return null;
    }
    describeAlgorithm(): string {
        return "blabla"
    }

}