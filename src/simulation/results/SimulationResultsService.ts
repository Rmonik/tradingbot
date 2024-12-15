import { injectable } from "inversify";
import { ISimulationResult } from "./types.js";
import { SimulationResultsRepository } from "./SimulationResultsRepository.js";


@injectable()
export class SimulationResultsService {

    public constructor(
        private readonly simulationResultsRepository: SimulationResultsRepository,
        
    ) { }

    public async finalizeResults(): Promise<void> {
        // Calculate the results
        const result = this.calculateSimulationResults();

        // Store the results
        await this.simulationResultsRepository.insert(result);

        // Prune the other simulation data data
        await this.pruneSimulationData();
    }

    private calculateSimulationResults(): ISimulationResult {
        throw new Error();
    }

    public async pruneSimulationData(): Promise<void> {
        throw new Error();
    }

} 