import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { CsvIngestor } from "../core/CsvIngestor.js";
import { SimulationPricesRepository } from "./SimulationPricesRepository.js";
import { IPricePoint } from "../core/types.js";
import { BalanceRepository } from "./balance/BalanceRepository.js";
import { SimulationConfigProvider } from "./SimulationConfigProvider.js";


@injectable()
export class SimulationPreparer {

  public constructor(
    private readonly csvIngestor: CsvIngestor,
    private readonly simulationPricesRepository: SimulationPricesRepository,
    private readonly balanceRepository: BalanceRepository,
    private readonly simulationConfigProvider: SimulationConfigProvider,
    
  ) { }

  public async prepareSimulation(): Promise<void> {
    await this.insertPricePoints();
    await this.initializeWallet();
  };


  private async insertPricePoints(): Promise<void> {
    const simulationData: ISimulationData[] = await this.csvIngestor.ingestCSV<ISimulationData>("assets/pricehistory/btc_daily.csv");
    const pricePoints: IPricePoint[] = simulationData.map((data) => {
      return {
        date: new Date(data.date),
        price: parseFloat(data.price.replace(",", "")),
      };
    });
    await this.simulationPricesRepository.insertPrices(pricePoints);
    await this.simulationPricesRepository.createIndexes();
  }

  private async initializeWallet(): Promise<void> {
    await this.balanceRepository.setBalance(this.simulationConfigProvider.getInitialWallet())
  }

}

interface ISimulationData {
  readonly date: string;
  readonly price: string;
}