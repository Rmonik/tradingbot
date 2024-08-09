import { IBalanceChecker, IBalance } from "../trading/types";
import { NotImplementedError } from "../utils/Errors";

export class BalanceCheckerSimulation implements IBalanceChecker {
  public checkBalance(): Promise<IBalance> {
    throw new NotImplementedError();
  }
}