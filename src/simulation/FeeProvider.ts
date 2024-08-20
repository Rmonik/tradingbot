import { injectable } from "inversify";
import { IFee } from "./types.js";

@injectable()
export class FeeProvider {

  public getFee(): IFee {
    return {
      maker: 0.0025,
      taker: 0.0040,
    }
  }
}

