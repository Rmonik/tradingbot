import { ITaxConfig, TaxMethod } from './types.js';

export class TaxConfigProvider {

  public getConfig(): ITaxConfig {
    return {
      taxRate: 0.25,
      taxMethod: TaxMethod.FIFO,
    }
  }
}