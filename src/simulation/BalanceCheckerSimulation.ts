
import { injectable } from "inversify"
import { NotImplementedError } from "../utils/Errors.js";
import { IBalanceChecker, IBalance } from "../trading/types.js";
import { BalanceRepository } from "./BalanceRepository.js";

@injectable()
export class BalanceCheckerSimulation implements IBalanceChecker {

  public constructor(
    private readonly balanceRepository: BalanceRepository,
  ) { }

  public async checkBalance(): Promise<IBalance> {
    return await this.balanceRepository.getBalance();
  }
}