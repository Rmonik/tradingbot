import { inject, injectable } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { CsvIngestor } from "../core/CsvIngestor.js";
import { SimulationPricesRepository } from "./SimulationPricesRepository.js";
import { Asset, IPricePoint } from "../core/types.js";
import { SimulationConfigProvider } from "./SimulationConfigProvider.js";
import { UserRepository } from "../users/UserRepository.js";
import { IUser } from "../users/types.js";
import { DateService } from "../core/DateService.js";


@injectable()
export class SimulationPreparer {

  public constructor(
    private readonly csvIngestor: CsvIngestor,
    private readonly simulationPricesRepository: SimulationPricesRepository,
    private readonly userRepository: UserRepository,
    private readonly simulationConfigProvider: SimulationConfigProvider,
    private readonly dateService: DateService,
    
  ) { }

  public async prepareSimulation(): Promise<{ userId: string }> {
    await this.insertPricePoints();
    
    const userId = await this.userRepository.createUser({
      firstName: "Michael",
      lastName: "Saylor",
      email: "msaylor@fake.com",
    }, {
      wallet: 0,
      fiat: 0,
      modifiedOn: new Date(),       // @todo get this out of here, should be set in repo
    });
    await this.initializeWallet(userId);
    return { userId: userId }
  };


  private async insertPricePoints(): Promise<void> {
    const asset: Asset = this.simulationConfigProvider.getAsset();

    // Early return
    const alreadyExists = await this.simulationPricesRepository.assetAlreadyExists(asset)
    if(alreadyExists) return;

    const simulationData: ISimulationData[] = await this.csvIngestor.ingestCSV<ISimulationData>(`assets/pricehistory/${asset}_daily.csv`);
    const pricePoints: IPricePoint[] = simulationData.map((data) => {
      return {
        date: new Date(data.date),
        price: parseFloat(data.price.replace(",", "")),
        asset: asset,
      };
    });
    await this.simulationPricesRepository.insertPrices(pricePoints);
    await this.simulationPricesRepository. createIndexes();
  }

  private async initializeWallet(userId: string): Promise<void> {
    await this.userRepository.setBalance(userId, this.simulationConfigProvider.getInitialWallet())
  }

}

interface ISimulationData {
  readonly date: string;
  readonly price: string;
}