import { injectable } from "inversify";
import { Asset, IPricePoint } from "../core/types.js";
import { IPriceChecker } from "./types.js";

@injectable()
export class PriceChecker implements IPriceChecker {
  public checkPrice(asset: Asset): Promise<IPricePoint> {
    throw new Error("Method not implemented.");
  }

}