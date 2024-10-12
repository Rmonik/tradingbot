import { Container } from "inversify";
import { Admin, Collection, Document, InsertManyResult, Sort } from "mongodb";

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
   * @param database - **WARNING: you usually don't need this.** The name of the database to execute the callback on
   */
  execute<T extends Document, R>(collection: string, callback: (collection: Collection<T>) => Promise<R>, database?: string): Promise<R>;
  execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T | null>, database?: string): Promise<T | null>;
  execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T[]>, database?: string): Promise<T[]>;
  execute<T extends Document>(collection: string, callback: (collection: Collection<T>) => Promise<T | T[] | null>, database?: string): Promise<T | null | T[]>;


  /**
   * @warning - This method is not intended for general use. It is intended for use in migrations and database initialization.
   * @param callback - execute a callback on the admin database
   */
  executeAdmin<T>(callback: (db: Admin) => Promise<T>): Promise<T | void>;

}

export interface IPricePoint {
  date: Date;
  price: number;
}