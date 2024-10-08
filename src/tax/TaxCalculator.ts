import { TaxConfigProvider } from './TaxConfigProvider.js';

export class TaxCalculator {

  public constructor(
    private readonly TaxConfigProvider: TaxConfigProvider,
  ) { }
  public calculateTax(amount: number): number {
    return amount * 0.25;
  }
}