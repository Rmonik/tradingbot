import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../../core/Container/ContainerIdentifiers.js";
import { IDatabase } from "../../core/types.js";

@injectable()
export class SimulationPruningRepository {
  
  public constructor(
    @inject(ContainerIdentifiers.Database) private readonly database: IDatabase,
  ) { }

  public async getAllSimulationDbs(): Promise<string[]> {
    const results = await this.database.executeAdmin(async adminDb => {
      const result = await adminDb.listDatabases();
      return result.databases.map(db => db.name).filter(name => name.startsWith("simulation"));
    });
    return results ?? [];
  }
}