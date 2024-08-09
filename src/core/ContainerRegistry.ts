import { Container } from "inversify";
import { ContainerIdentifiers } from "./ContainerIdentifiers";
import { ResolutionMode } from "./types";
import { DateService } from "./DateService";
import { Cron } from "./Cron";


export function registerContainerServices(container: Container) {
  container.bind(ContainerIdentifiers.ResulotionMode).toConstantValue(ResolutionMode.Main);
  container.bind(Cron).toSelf();

  container.bind(DateService).toSelf();
}
