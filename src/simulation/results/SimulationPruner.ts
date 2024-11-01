import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../../core/Container/ContainerIdentifiers.js";
import { IDatabase } from "../../core/types.js";
import { SimulationPruningRepository } from "./SimulationPruningRepository.js";

@injectable()
export class SimulationPruner {
  
  public constructor(
    private readonly simulationPruningRepository: SimulationPruningRepository,
  ) { }

  public async prune(): Promise<void> {
    const dbs = await this.simulationPruningRepository.getAllSimulationDbs();
    for(const db of dbs) {
      await this.simulationPruningRepository.dropDb(db);
    }
  }
}