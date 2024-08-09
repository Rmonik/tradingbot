import { IPriceChecker } from "../trading/types";


export class PriceCheckerSimulation implements IPriceChecker {
  public checkPrice(): Promise<number> {
    throw new Error("Method not implemented.");
  }

}