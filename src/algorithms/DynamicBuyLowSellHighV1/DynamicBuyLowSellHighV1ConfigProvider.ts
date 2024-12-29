import { getRandomNumberBetween } from "../../utils/RandomUtils.js";
import { IAlgorithmConfigProvider } from "../types.js";
import { DynamicBuyLowSellHighV1Config } from "./types.js";

export class DynamicBuyLowSellHighV1ConfigProvider implements IAlgorithmConfigProvider {

    private config:DynamicBuyLowSellHighV1Config  = {
        initialBuyIn: 0.3,
        sellTreshold: 0.1,
        sellAmountBase: 0.05,
        sellAmountMax: 0.6,
        buyTreshold: 0.1,
        buyAmountBase: 0.05,
        buyAmountMax: 0.6
    }

    getConfig(): DynamicBuyLowSellHighV1Config {
        return this.config;
    }
    randomizeConfig(): void {
        this.config = {
            initialBuyIn: getRandomNumberBetween(0, 0.9),
            sellTreshold: getRandomNumberBetween(0.05, 0.4),
            sellAmountBase: getRandomNumberBetween(0.02, 0.3),
            sellAmountMax: getRandomNumberBetween(0.1, 0.8),
            buyTreshold: getRandomNumberBetween(0.05, 0.3),
            buyAmountBase:getRandomNumberBetween(0.02, 0.3),
            buyAmountMax: getRandomNumberBetween(0.1, 0.8),
        }
    }
    
}