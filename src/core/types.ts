import { Container } from "inversify";
import { Collection, Document, Sort } from "mongodb";

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

export interface IDatabase {
  execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T | null | string>): Promise<T | null>;

}

export interface IPricePoint {
  date: Date;
  price: number;
}