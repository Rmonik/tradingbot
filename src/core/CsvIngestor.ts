
import { promises as fs }   from "fs";
import { injectable } from "inversify";
import neatCsv from "neat-csv";

@injectable()
export class CsvIngestor {

  public async ingestCSV<T>(filePath: string): Promise<T[]> {

    const buffer = await fs.readFile(filePath, { encoding: "utf8" });
    const results = await neatCsv(buffer);
    console.log(results);
    return results as T[];
  }
}
