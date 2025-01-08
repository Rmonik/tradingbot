import { inject, injectable } from "inversify";
import { IFee, ISimulationInterval, SimulationMode } from "./types.js";
import { IBalance } from "../trading/types.js";
import { Asset } from "../core/types.js";
import { DateService } from "../core/DateService.js";
import { TradingAlgorithm } from "../transactions/types.js";

@injectable()
export class SimulationConfigProvider {
  
  public constructor(private readonly dateService: DateService) { }

  public getSimulationMode(): SimulationMode {
    return SimulationMode.Once;
  }

  public getLoopsForRandomizedMode(): number {
    return 200;
  }

  public getInitialBalance(): IBalance {
    return {
      wallet: 0,
      fiat: 10000,
      modifiedOn: this.dateService.getNow()
    }
  }

  public getFee(): IFee {
    return {
      maker: 0.0025,
      taker: 0.0040,
    }
  }

  public getAsset(): Asset {
    return Asset.BTC;
  }
 
  public getSimulationInterval(): ISimulationInterval {
    // return {
    //   name: "long term",
    //   start: new Date("2017-01-01T00:00:00Z"),
    //   end: new Date("2023-01-02T00:00:00Z"),
    // }
    // return {
    //   name: "1y bull",
    //   start: new Date("2020-04-17T00:00:00Z"),
    //   end: new Date("2021-04-17T00:00:00Z"),
    // }
    // return {
    //   name: "1y bear",
    //   start: new Date("2021-10-21T00:00:00Z"),
    //   end: new Date("2022-10-21T00:00:00Z"),
    // }
    return {
      name: "1y static",
      start: new Date("2021-02-06T00:00:00Z"),
      end: new Date("2022-02-26T00:00:00Z"),
    }
  }

  public getAlgorithm(): TradingAlgorithm {
    return TradingAlgorithm.BasicBuyLowSellHighNoRepeatsV1;
  }
}
