import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers";
import { IDatabase } from "../core/types";


@injectable()
export class Simulator {

  constructor(@inject(ContainerIdentifiers.Database) private readonly database: IDatabase) { }

  public async simulate(): Promise<void> {
    await this.database.create("sometestschema", { name: "test" });
  }
}