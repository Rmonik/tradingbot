import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { IDatabase } from "../core/types.js";
import { ISimulationResult } from "./types.js";

@injectable()
export class SimulationResultRepository {
  constructor(
    @inject(ContainerIdentifiers.Database) private readonly database: IDatabase,
  ) { }

  private readonly collectionName = "simulation_results";

  public async insertSimulationResult(result: ISimulationResult): Promise<void> {
    await this.database.execute(this.collectionName, col => col.insertOne(result));
  }
}