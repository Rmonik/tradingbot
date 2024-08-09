import { Container } from "inversify";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers";
import { ResolutionMode } from "../core/types";
import { Simulator } from "./Simulator";
import { TransactionExecutorSimulation } from "./TransactionExecutorSimulation";
import { ITransactionExecutor } from "../transactions/types";
import { BalanceCheckerSimulation } from "./BalanceCheckerSimulation";
import { IBalanceChecker, IPriceChecker } from "../trading/types";
import { PriceChecker } from "../trading/PriceChecker";


export function registerSimulationContainerServices(container: Container) {
  // register private services here
  container.bind(ContainerIdentifiers.ResulotionMode).toConstantValue(ResolutionMode.Simulation);
  container.bind(Simulator).toSelf();
  container.bind<ITransactionExecutor>(ContainerIdentifiers.TransactionExecutor).to(TransactionExecutorSimulation);

  container.bind<IBalanceChecker>(ContainerIdentifiers.BalanceChecker).to(BalanceCheckerSimulation);
  container.bind<IPriceChecker>(ContainerIdentifiers.BalanceChecker).to(PriceChecker);
}