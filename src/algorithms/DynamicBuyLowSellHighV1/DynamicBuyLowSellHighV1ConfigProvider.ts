import { IAlgorithmConfig, IAlgorithmConfigProvider } from "../types.js";
import { DynamicBuyLowSellHighV1Config } from "./types.js";

export class DynamicBuyLowSellHighV1ConfigProvider implements IAlgorithmConfigProvider {
    getConfig(): DynamicBuyLowSellHighV1Config {
        throw new Error("Method not implemented.");
    }
    randomizeConfig(): void {
        throw new Error("Method not implemented.");
    }
    
}