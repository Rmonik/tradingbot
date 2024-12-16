import { ITaxCalculationResult } from "../../tax/types.js";
import { IBalance, TradingAlgorithm } from "../../trading/types.js";
import { ISimulationInterval } from "../types.js";

export interface ISimulationResult {
    readonly finalBalance: {
      readonly wallet: number,
      readonly fiat: number,
      readonly valueOnFinalDay: number,
      readonly valueIncreaseFactor: number,
      readonly holdIncreaseFactor: number,
      readonly valueIncreaseComparedToHodlFactor: number,
    },
    readonly taxes: ITaxCalculationResult,
    readonly algorithm: {
      readonly name: TradingAlgorithm,
      readonly description: string,
      readonly config: { [key: string]: string | number }
    },
    readonly transactions: {
      readonly totalAmount: number,
      readonly buysAmount: number,
      readonly sellsAmount: number,
    }
    readonly period: ISimulationInterval
  }