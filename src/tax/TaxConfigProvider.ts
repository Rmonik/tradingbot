import { inject, injectable } from 'inversify';
import { ITaxConfig, TaxMethod } from './types.js';

@injectable()
export class TaxConfigProvider {

  public getConfig(): ITaxConfig {
    return {
      taxRate: 0.25,
      taxMethod: TaxMethod.FIFO,
    }
  }
}