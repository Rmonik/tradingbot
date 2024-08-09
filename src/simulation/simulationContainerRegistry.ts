import { Container } from "inversify";
import { ContainerIdentifiers } from "../core/ContainerIdentifiers";
import { ResolutionMode } from "../core/types";


export function registerSimulationContainerServices(container: Container) {
  // register private services here
  container.bind(ContainerIdentifiers.ResulotionMode).toConstantValue(ResolutionMode.Simulation);
}