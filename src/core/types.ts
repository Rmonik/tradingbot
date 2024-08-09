import { Container } from "inversify";

export interface IJob {
  readonly run: () => Promise<void>;
}

export enum ResolutionMode {
  Main = "main",
  Simulation = "simulation",
}

export interface IContainerManager {
  getContainer(): Container;
}