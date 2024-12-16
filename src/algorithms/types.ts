import { ITransaction, IOrder } from "../transactions/types.js";

export interface IAlgorithmConfigProvider {
  getConfig(): IAlgorithmConfig;
  randomizeConfig(): void;
}

export interface IAlgorithmConfig {
  [key: string]: any
}

export interface ITradingAlgorithm {
  getConfig(): IAlgorithmConfig;
  determineTransaction(currentPrice: number, wallet: number, fiat: number, lastTransaction: ITransaction | null): IOrder | null;
  describeAlgorithm(): string;
}