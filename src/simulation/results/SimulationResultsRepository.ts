import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../../core/Container/ContainerIdentifiers.js";
import { IDatabase } from "../../core/types.js";
import { ISimulationResult } from "./types.js";

@injectable()
export class SimulationResultsRepository {

    public constructor(
        @inject(ContainerIdentifiers.Database) private readonly database: IDatabase,
    ) { }

    private readonly collection: string = "simulationResults";
    
    public async insert(simulationResult: ISimulationResult): Promise<void> {
        await this.database.execute(this.collection, coll => coll.insertOne(simulationResult));
    }
}