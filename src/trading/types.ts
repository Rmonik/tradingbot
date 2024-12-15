import { IPricePoint } from "../core/types.js";

export interface ITrader {
  trade(userId: string): Promise<void>;
}

export interface IPriceChecker {
  checkPrice(): Promise<IPricePoint>;
}

export interface IBalance {
  wallet: number;
  fiat: number;
  modifiedOn: Date;
}

export enum TradingAlgorithm {
  BasicBuyLowSellHighV1 = "BasicBuyLowSellHighV1"
}