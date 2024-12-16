import { Container } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { TradingAlgorithm } from "../transactions/types.js";
import { BasicBuyAndHoldV1Algorithm } from "./BasicBuyAndHoldV1/BasicBuyAndHoldV1Algorithm.js";
import { IAlgorithmConfigProvider, ITradingAlgorithm } from "./types.js";
import { BasicBuyAndHoldV1ConfigProvider } from "./BasicBuyAndHoldV1/BasicBuyAndHoldV1ConfigProvider.js";


export function registerAlgorithmServices(container: Container) {


    /* 
    * Have to bind the config providers  toSelf() inSingletonScope() AND bind them .toService()
    * to the symbol so the symbol accesses the singleton
    */
    container.bind(BasicBuyAndHoldV1ConfigProvider).toSelf().inSingletonScope();
    container.bind<IAlgorithmConfigProvider>(ContainerIdentifiers.TradingAlgorithmConfigProviders).toService(BasicBuyAndHoldV1ConfigProvider);
    

    container.bind(BasicBuyAndHoldV1Algorithm).toSelf();

    /* This is essentially a factory that fetches the correct algorithm */
    container.bind<ITradingAlgorithm>(ContainerIdentifiers.TradingAlgorithm).toDynamicValue(context => {
      switch (context.container.get<TradingAlgorithm>(ContainerIdentifiers.TradingAlgorithmName)) {
        case TradingAlgorithm.BasicBuyLowSellHighV1:
          return context.container.get<ITradingAlgorithm>(BasicBuyAndHoldV1Algorithm);
        default:
          throw new Error("Unknown trading algorithm");
      }
    });
}