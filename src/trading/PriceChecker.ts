import { injectable } from "inversify";
import { IPricePoint } from "../core/types.js";
import { IPriceChecker } from "./types.js";

@injectable()
export class PriceChecker implements IPriceChecker {
  public checkPrice(): Promise<IPricePoint> {
    throw new Error("Method not implemented.");
  }

}