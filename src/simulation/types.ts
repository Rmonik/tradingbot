

export interface IFee {
  maker: number,
  taker: number,
}

export interface ISimulationInterval {
  name: string,
  start: Date,
  end: Date,
}

export enum SimulationMode {
  Once = "once",
  Randomized = "randomized",
}
