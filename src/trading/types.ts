import { Asset, IPricePoint } from "../core/types.js";

export interface ITrader {
  trade(userId: string, asset: Asset): Promise<void>;
}

export interface IPriceChecker {
  checkPrice(asset: Asset): Promise<IPricePoint>;
}

export interface IBalance {
  wallet: number;
  fiat: number;
  modifiedOn: Date;
}

export enum TradingAlgorithm {
  BasicBuyLowSellHighV1 = "BasicBuyLowSellHighV1"
}