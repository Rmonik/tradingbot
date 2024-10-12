import { Container } from "inversify";
import { Collection, Document, InsertManyResult, Sort } from "mongodb";

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
  /** 
   * @generic T - The type of the document to return from find operations
   * @param collection - The name of the collection to execute the callback on
   * @param callback - The callback to execute on the collection
   */
  execute<T extends Document, R>(collection: string, callback: (collection: Collection<T>) => Promise<R>): Promise<R>;
  execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T | null>): Promise<T | null>;
  execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T[] >): Promise<T[]>;
  execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T | T[] | null>): Promise<T | null | T[]>;

}

export interface IPricePoint {
  date: Date;
  price: number;
}