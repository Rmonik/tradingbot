
export interface ITaxConfig {
  taxRate: number,
  taxMethod: TaxMethod,
}

export enum TaxMethod {
  FIFO = "FIFO",
  LIFO = "LIFO",
}

export interface ITaxCalculationResult {
  readonly taxableProfit: number,
  readonly taxAmount: number,
  readonly taxMethod: TaxMethod,
}