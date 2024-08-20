import { Container } from "inversify";
import { TransactionDeterminator } from "../../transactions/TransactionDeterminator.js";
import { Cron } from "../Cron.js";
import { CsvIngestor } from "../CsvIngestor.js";
import { Database } from "../Database.js";
import { DateService } from "../DateService.js";
import { ResolutionMode, IDatabase } from "../types.js";
import { ContainerIdentifiers } from "./ContainerIdentifiers.js";
import { Trader } from "../../trading/Trader.js";
import { TransactionRepository } from "../../transactions/TransactionRepository.js";



export function registerContainerServices(container: Container) {
  container.bind(ContainerIdentifiers.ResulotionMode).toConstantValue(ResolutionMode.Main);
  container.bind(Cron).toSelf();
  container.bind<IDatabase>(ContainerIdentifiers.Database).to(Database);

  container.bind(DateService).toSelf();
  container.bind(TransactionDeterminator).toSelf();
  container.bind(CsvIngestor).toSelf();
  container.bind(Trader).toSelf();
  container.bind(TransactionRepository).toSelf();
}
