import { injectable } from "inversify";
import { IAlgorithmConfigProvider } from "../types.js";
import { IBasicBuyAndHoldNoRepeatsV1Config } from "./types.js";


@injectable()
export class BasicBuyLowSellHighNoRepeatsV1ConfigProvider implements IAlgorithmConfigProvider {

    private config: IBasicBuyAndHoldNoRepeatsV1Config = {
        initialBuyin: 0.5,
        sellTreshold: 0.15,
        sellAmount: 0.05,
        buyTreshold: 0.03,
        buyAmount: 0.1,
    }
    
    public getConfig(): IBasicBuyAndHoldNoRepeatsV1Config {
        return this.config;
    }

    public randomizeConfig(): void {
        this.config = {
            initialBuyin: Math.random() * 0.95,
            sellTreshold: Math.random() * 0.5,
            sellAmount: Math.random() * 0.5,
            buyTreshold: Math.random() * 0.5,
            buyAmount: Math.random() * 0.5,
        }
    }
    

}
