import { ITransaction, IOrder } from "../transactions/types.js";

export interface IAlgorithmConfigProvider {
  getConfig(): IAlgorithmConfig;
  randomizeConfig(): void;
}

export interface IAlgorithmConfig {
  [key: string]: any
}

export interface IAlgorithm {
  getConfig(): IAlgorithmConfig;
  determineTransaction(currentPrice: number, wallet: number, fiat: number, transactionHistory: ITransaction[]): IOrder | null;
  describeAlgorithm(): string;
}