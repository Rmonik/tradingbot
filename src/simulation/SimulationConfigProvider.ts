import { inject, injectable } from "inversify";
import { IFee } from "./types.js";
import { IBalance, TradingAlgorithm } from "../trading/types.js";
import { Asset } from "../core/types.js";
import { DateService } from "../core/DateService.js";

@injectable()
export class SimulationConfigProvider {
  
  public constructor(private readonly dateService: DateService) { }

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
 
  public getSimulationInterval(): { start: Date, end: Date } {
    return {
      start: new Date("2017-01-01T00:00:00Z"),
      end: new Date("2023-01-02T00:00:00Z"),
    }
  }

  public getAlgorithm(): TradingAlgorithm {
    return TradingAlgorithm.BasicBuyLowSellHighV1;
  }
}
