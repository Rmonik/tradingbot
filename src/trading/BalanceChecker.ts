import { NotImplementedError } from "../utils/Errors.js";
import { IBalanceChecker, IBalance } from "./types.js";


export class BalanceChecker implements IBalanceChecker {
  public checkBalance(): Promise<IBalance> {
    throw new NotImplementedError();
  }
}