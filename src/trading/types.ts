
export interface ITrader {
  trade(): Promise<void>;
}

export interface IBalanceChecker {
  checkBalance(): Promise<IBalance>;
}

export interface IPriceChecker {
  checkPrice(): Promise<number>;
}

export interface IBalance {
  wallet: number;
  fiat: number;
}