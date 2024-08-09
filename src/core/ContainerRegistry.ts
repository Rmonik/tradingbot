import { Container } from "inversify";
import { ContainerIdentifiers } from "./ContainerIdentifiers";
import { ResolutionMode } from "./types";


export function registerContainerServices(container: Container) {
  container.bind(ContainerIdentifiers.ResulotionMode).toConstantValue(ResolutionMode.Main);
}
