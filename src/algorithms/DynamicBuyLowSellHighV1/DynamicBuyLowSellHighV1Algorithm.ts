import { ITransaction, IOrder } from "../../transactions/types.js";
import { IAlgorithm, IAlgorithmConfig } from "../types.js";
import { DynamicBuyLowSellHighV1Config } from "./types.js";


export class DynamicBuyLowSellHighV1Algorithm implements IAlgorithm {



    getConfig(): DynamicBuyLowSellHighV1Config {
        throw new Error("Method not implemented.");
    }
    determineTransaction(currentPrice: number, wallet: number, fiat: number, transactionHistory: ITransaction[]): IOrder | null {
        throw new Error("Method not implemented.");
    }
    describeAlgorithm(): string {
        return "blabla"
    }

}