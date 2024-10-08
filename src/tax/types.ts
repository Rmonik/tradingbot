
export interface ITaxConfig {
  taxRate: number,
  taxMethod: TaxMethod,
}

export enum TaxMethod {
  FIFO = "FIFO",
  LIFO = "LIFO",
}

export interface ITaxCalculationResult {
  taxableProfit: number,
  taxAmount: number,
}