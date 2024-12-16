import { ITaxCalculationResult } from "../../tax/types.js";
import { IBalance, TradingAlgorithm } from "../../trading/types.js";

export interface ISimulationResult {
    readonly finalBalance: {
      wallet: number,
      fiat: number,
      valueOnFinalDay: number,
      valueIncreaseFactor: number,
      valueIncreaseComparedToHodlFactor: number,
    },
    readonly taxes: ITaxCalculationResult,
    readonly algorithm: {
      name: TradingAlgorithm,
      description: string,
    },
    readonly transactions: {
      totalAmount: number,
      buysAmount: number,
      sellsAmount: number,
    }
  }