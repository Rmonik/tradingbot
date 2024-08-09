import { NotImplementedError } from "../utils/Errors";
import { IBalance, IBalanceChecker } from "./types";

export class BalanceChecker implements IBalanceChecker {
  public checkBalance(): Promise<IBalance> {
    throw new NotImplementedError()
  }
}