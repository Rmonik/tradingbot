import { Container } from "inversify";
import { ITradingAlgorithm } from "../transactions/types.js";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { TradingAlgorithm } from "./types.js";
import { BasicBuyAndHoldV1Algorithm } from "../transactions/BasicBuyAndHoldV1Algorithm.js";


export function registerTradingServices(container: Container) {

  container.bind(BasicBuyAndHoldV1Algorithm).toSelf();

  container.bind<ITradingAlgorithm>(ContainerIdentifiers.TradingAlgorithm).toDynamicValue(context => {
    switch (context.container.get<TradingAlgorithm>(ContainerIdentifiers.TradingAlgorithmName)) {
      case TradingAlgorithm.BasicBuyLowSellHighV1:
        return context.container.get<ITradingAlgorithm>(BasicBuyAndHoldV1Algorithm);
      default:
        throw new Error("Unknown trading algorithm");
    }
  });
  
}