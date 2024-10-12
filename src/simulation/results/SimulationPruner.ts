import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../../core/Container/ContainerIdentifiers.js";
import { IDatabase } from "../../core/types.js";
import { SimulationPruningRepository } from "./SimulationPruningRepository.js";

@injectable()
export class SimulationPruner {
  
  public constructor(
    private readonly simulationPruningRepository: SimulationPruningRepository,
  ) { }


}