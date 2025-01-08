import { Container } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { TradingAlgorithm } from "../transactions/types.js";
import { BasicBuyLowSellHighV1Algorithm } from "./BasicBuyLowSellHighV1/BasicBuyLowSellHighV1Algorithm.js";
import { IAlgorithmConfigProvider, IAlgorithm } from "./types.js";
import { BasicBuyLowSellHighV1ConfigProvider } from "./BasicBuyLowSellHighV1/BasicBuyLowSellHighV1ConfigProvider.js";
import { DynamicBuyLowSellHighV1Algorithm } from "./DynamicBuyLowSellHighV1/DynamicBuyLowSellHighV1Algorithm.js";
import { DynamicBuyLowSellHighV1ConfigProvider } from "./DynamicBuyLowSellHighV1/DynamicBuyLowSellHighV1ConfigProvider.js";
import { BasicBuyLowSellHighNoRepeatsV1ConfigProvider } from "./BasicBuyLowSellHighNoRepeatsV1/BasicBuyLowSellHighNoRepeatsV1ConfigProvider.js";
import { BasicBuyLowSellHighNoRepeatsV1Algorithm } from "./BasicBuyLowSellHighNoRepeatsV1/BasicBuyLowSellHighNoRepeatsV1Algorithm.js";


export function registerAlgorithmServices(container: Container) {


    /* 
    * Have to bind the config providers  toSelf() inSingletonScope() AND bind them .toService()
    * to the symbol so the symbol accesses the singleton
    */
    container.bind(BasicBuyLowSellHighV1ConfigProvider).toSelf().inSingletonScope();
    container.bind<IAlgorithmConfigProvider>(ContainerIdentifiers.TradingAlgorithmConfigProviders).toService(BasicBuyLowSellHighV1ConfigProvider);
    container.bind(DynamicBuyLowSellHighV1ConfigProvider).toSelf().inSingletonScope();
    container.bind<IAlgorithmConfigProvider>(ContainerIdentifiers.TradingAlgorithmConfigProviders).toService(DynamicBuyLowSellHighV1ConfigProvider);
    container.bind(BasicBuyLowSellHighNoRepeatsV1ConfigProvider).toSelf().inSingletonScope();
    container.bind<IAlgorithmConfigProvider>(ContainerIdentifiers.TradingAlgorithmConfigProviders).toService(BasicBuyLowSellHighNoRepeatsV1ConfigProvider);
    

    container.bind(BasicBuyLowSellHighV1Algorithm).toSelf();
    container.bind(DynamicBuyLowSellHighV1Algorithm).toSelf();
    container.bind(BasicBuyLowSellHighNoRepeatsV1Algorithm).toSelf();

    /* This is essentially a factory that fetches the correct algorithm */
    container.bind<IAlgorithm>(ContainerIdentifiers.TradingAlgorithm).toDynamicValue(context => {
      switch (context.container.get<TradingAlgorithm>(ContainerIdentifiers.TradingAlgorithmName)) {
        case TradingAlgorithm.BasicBuyLowSellHighV1:
          return context.container.get<IAlgorithm>(BasicBuyLowSellHighV1Algorithm);
        case TradingAlgorithm.DynamicBuyLowSellHighV1:
          return context.container.get<IAlgorithm>(DynamicBuyLowSellHighV1Algorithm);
        case TradingAlgorithm.BasicBuyLowSellHighNoRepeatsV1:
          return context.container.get<IAlgorithm>(BasicBuyLowSellHighNoRepeatsV1Algorithm);
        default:
          throw new Error("Unknown trading algorithm");
      }
    });
}