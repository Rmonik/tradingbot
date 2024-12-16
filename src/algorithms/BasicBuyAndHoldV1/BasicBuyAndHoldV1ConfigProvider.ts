import { inject, injectable } from "inversify";
import { IAlgorithmConfigProvider, IAlgorithmConfig } from "../types.js";
import { IBasicBuyAndHoldV1Config } from "./types.js";
import { ContainerIdentifiers } from "../../core/Container/ContainerIdentifiers.js";
import { ResolutionMode } from "../../core/types.js";
import { SimulationConfigProvider } from "../../simulation/SimulationConfigProvider.js";

@injectable()
export class BasicBuyAndHoldV1ConfigProvider implements IAlgorithmConfigProvider {

    public constructor(    
        @inject(ContainerIdentifiers.ResulotionMode) private readonly resolutionMode: ResolutionMode,
        private readonly simulationConfigProvider: SimulationConfigProvider) {}

    private config: IBasicBuyAndHoldV1Config = {
        initialBuyin: 0.5,
        sellTreshold: 0.1,
        sellAmount: 0.1,
        buyTreshold: 0.1,
        buyAmount: 0.1,
    }
    
    public getConfig(): IBasicBuyAndHoldV1Config {
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
