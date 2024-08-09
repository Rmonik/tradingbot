import { Container } from "inversify";
import { ContainerIdentifiers } from "../Container/ContainerIdentifiers";
import { IDatabase, ResolutionMode } from "../types";
import { DateService } from "../DateService";
import { Cron } from "../Cron";
import { Database } from "../Database";
import { TransactionDeterminator } from "../../transactions/TransactionDeterminator";


export function registerContainerServices(container: Container) {
  container.bind(ContainerIdentifiers.ResulotionMode).toConstantValue(ResolutionMode.Main);
  container.bind(Cron).toSelf();
  container.bind<IDatabase>(ContainerIdentifiers.Database).to(Database);

  container.bind(DateService).toSelf();
  container.bind(TransactionDeterminator).toSelf();
}
