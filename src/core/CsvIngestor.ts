
import { promises as fs }   from "fs";
import { injectable } from "inversify";
import neatCsv from "neat-csv";

@injectable()
export class CsvIngestor {

  public async ingestCSV<T>(filePath: string): Promise<T[]> {
    try {
      const buffer = await fs.readFile(filePath, { encoding: "utf8" });
      const results = await neatCsv(buffer);
      return results as T[];
    }
    catch (error: unknown) {
      console.log("something went wrong parsing the simulation CSV data");
      throw error;
    }
  }
}
