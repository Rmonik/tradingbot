import { inject, injectable } from "inversify";
import { Null } from "../utils/types.js";
import { isDefined } from "../utils/TypeUtils.js";
import { ITransaction, IOrder, TransactionType, ITradingAlgorithm } from "./types.js";
import { ResolutionMode } from "../core/types.js";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { SimulationConfigProvider } from "../simulation/SimulationConfigProvider.js";
import { SimulationMode } from "../simulation/types.js";


@injectable()
export class BasicBuyAndHoldV1Algorithm implements ITradingAlgorithm {

  public constructor(
    @inject(ContainerIdentifiers.ResulotionMode) private readonly resolutionMode: ResolutionMode,
    private readonly simulationConfigProvider: SimulationConfigProvider,
  ) {

  }

  public getConfig() {
    if (this.resolutionMode === ResolutionMode.Simulation && this.simulationConfigProvider.getSimulationMode() === SimulationMode.Randomized) return {
      initialBuyin: Math.random(),
      sellTreshold: Math.random() * 0.5,
      sellAmount: Math.random() * 0.5,
      buyTreshold: Math.random() * 0.5,
      buyAmount: Math.random() * 0.5,
    }
    
    
      return {
    initialBuyin: 0.6,
    sellTreshold: 0.10,
    sellAmount: 0.05,
    buyTreshold: 0.05,
    buyAmount: 0.05,
    }
  } 

  public describeAlgorithm(): string {
    return (
      `A basic buy-low-sell-high algorithm. The algorithm starts off by spending ${this.getConfig().initialBuyin * 100}% of fiat on an initial buy. `+
      `Then, algorithm sells ${this.getConfig().sellAmount*100}% of assets when the price has raised by ${this.getConfig().sellTreshold * 100}%. ` +
      `Or, it buys ${this.getConfig().buyAmount*100}% of remaining fiat worth when the price has lowered by ${this.getConfig().buyTreshold * 100}%.`
    );
  }

  public determineTransaction(currentPrice: number, wallet: number, fiat: number, lastTransaction: Null<ITransaction>): Null<IOrder> {
  
    // Initial buy
    if(!isDefined(lastTransaction)) return {
      type: TransactionType.BUY,
      amount: fiat * this.getConfig().initialBuyin / currentPrice,
    }

    if(currentPrice > lastTransaction.price * (1 + this.getConfig().sellTreshold)) {
      
      return {
        type: TransactionType.SELL,
        amount: wallet * this.getConfig().sellAmount,
      }
    }
    
    if(currentPrice < lastTransaction.price * (1 - this.getConfig().buyTreshold)) {
      return {
        type: TransactionType.BUY,
        amount: (fiat * this.getConfig().buyAmount) / currentPrice,
      }
    }

    return null;
  }
  
}