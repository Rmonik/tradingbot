import { injectable } from "inversify";
import { IFee } from "./types.js";
import { IBalance } from "../trading/types.js";

@injectable()
export class SimulationConfigProvider {

  public getInitialWallet(): IBalance {
    return {
      wallet: 0,
      fiat: 10000
    }
  }

  public getFee(): IFee {
    return {
      maker: 0.0025,
      taker: 0.0040,
    }
  }
}
