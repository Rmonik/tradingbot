import { IPriceChecker } from "./types";


export class PriceChecker implements IPriceChecker {
  public checkPrice(): Promise<number> {
    throw new Error("Method not implemented.");
  }

}