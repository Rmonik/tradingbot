import { Container } from "inversify";
import { Sort } from "mongodb";

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
  find(collection: string, filter: object): Promise<any[]>;
  findExtended(collection: string, filter: object, sort?: Sort, limit?: number): Promise<any[]>;
  create(collection: string, document: object ): Promise<void>;
  update(collection: string, filter: object, update: object ): Promise<void>;
  delete(collection: string, filter: object ): Promise<void>;
}