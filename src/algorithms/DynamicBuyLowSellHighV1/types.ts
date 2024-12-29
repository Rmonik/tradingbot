export interface DynamicBuyLowSellHighV1Config {
    initialBuyIn: number,
    sellTreshold: number,
    sellAmountBase: number,
    sellAmountMax: number,
    buyTreshold: number,
    buyAmountBase: number,
    buyAmountMax: number,
}