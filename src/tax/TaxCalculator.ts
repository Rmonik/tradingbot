import { ITransaction } from '../transactions/types.js';
import { TaxConfigProvider } from './TaxConfigProvider.js';
import { ITaxCalculationResult } from './types.js';

export class TaxCalculator {

  public constructor(
    private readonly TaxConfigProvider: TaxConfigProvider,
  ) { }
  public calculateTax(transactionHistory: ITransaction): ITaxCalculationResult {
    throw new Error("Not implemented");
  }


  private calculateFIFO(transactionHistory: ITransaction): ITaxCalculationResult {
    throw new Error("Not implemented");

  }
}