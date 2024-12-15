import { Container } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { ResolutionMode } from "../core/types.js";
import { PriceChecker } from "../trading/PriceChecker.js";
import { IPriceChecker } from "../trading/types.js";
import { ITransactionExecutor } from "../transactions/types.js";
import { SimulationPreparer } from "./SimulationPreparer.js";
import { SimulationPricesRepository } from "./SimulationPricesRepository.js";
import { Simulator } from "./Simulator.js";
import { SimulationConfigProvider } from "./SimulationConfigProvider.js";
import { PriceCheckerSimulation } from "./price/PriceCheckerSimulation.js";
import { TransactionExecutorSimulation } from "./transactions/TransactionExecutorSimulation.js";
import { SimulationResultsService } from "./results/SimulationResultsService.js";
import { SimulationResultsRepository } from "./results/SimulationResultsRepository.js";



export function registerSimulationContainerServices(container: Container) {
  // Core
  container.bind(ContainerIdentifiers.ResulotionMode).toConstantValue(ResolutionMode.Simulation);

  // Simulation specific services
  container.bind(Simulator).toSelf();
  container.bind(SimulationPricesRepository).toSelf();
  container.bind(SimulationPreparer).toSelf();
  container.bind(SimulationConfigProvider).toSelf();
  container.bind(SimulationResultsService).toSelf();
  container.bind(SimulationResultsRepository).toSelf();

  // Simulation overrides
  container.bind<IPriceChecker>(ContainerIdentifiers.PriceChecker).to(PriceCheckerSimulation);
  container.bind<ITransactionExecutor>(ContainerIdentifiers.TransactionExecutor).to(TransactionExecutorSimulation);
}