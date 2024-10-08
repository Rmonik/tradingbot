
import { injectable } from "inversify"
import { IBalanceChecker, IBalance } from "../trading/types.js";
import { BalanceRepository } from "./BalanceRepository.js";
import { isDefined } from "../utils/TypeUtils.js";

@injectable()
export class BalanceCheckerSimulation implements IBalanceChecker {

  public constructor(
    private readonly balanceRepository: BalanceRepository,
  ) { }

  public async checkBalance(): Promise<IBalance> {
    const result = await this.balanceRepository.getBalance();
    if(!isDefined(result)) {
      throw new Error("Balance not found");
    }
    return result;
  }
}