import { ITaxCalculationResult } from "../tax/types.js";
import { IBalance, TradingAlgorithm } from "../trading/types.js";


export interface IFee {
  maker: number,
  taker: number,
}

export interface ISimulationResult {
  readonly finalBalance: IBalance,
  readonly taxes: ITaxCalculationResult,
  readonly algorithm: TradingAlgorithm,
}