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
  execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T | null >): Promise<T | null >;
  execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T[] >): Promise<T[] >;
  execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T | T[] | null >): Promise<T | null | T[] >;

}

export interface IPricePoint {
  date: Date;
  price: number;
}