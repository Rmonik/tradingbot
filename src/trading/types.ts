import { IPricePoint } from "../core/types.js";

export interface ITrader {
  trade(): Promise<void>;
}

export interface IBalanceChecker {
  checkBalance(): Promise<IBalance>;
}

export interface IPriceChecker {
  checkPrice(): Promise<IPricePoint>;
}

export interface IBalance {
  wallet: number;
  fiat: number;
}

export enum TradingAlgorithm {
  BasicBuyLowSellHighV1 = "BasicBuyLowSellHighV1"
}