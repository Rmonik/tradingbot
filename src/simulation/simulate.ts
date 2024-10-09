import { randomUUID } from "crypto";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { ContainerManager } from "../core/Container/ContainerManager.js";
import { ResolutionMode } from "../core/types.js";
import { Simulator } from "./Simulator.js";
import { Database } from "../core/Database.js";
import { SimulationConfigProvider } from "./SimulationConfigProvider.js";


// Create DI Container
const containerManager = new ContainerManager();
containerManager.init(ResolutionMode.Simulation);
const container = containerManager.getContainer();

// generate db name
const dbName = `simulation-${randomUUID()}`;
console.log("Generated database name: ", dbName);
container.bind(ContainerIdentifiers.DatabaseName).toConstantValue(dbName);

// specify algorithm
const simulationConfigProvider = container.get(SimulationConfigProvider);
container.bind(ContainerIdentifiers.TradingAlgorithmName).toConstantValue(simulationConfigProvider.getAlgorithm());

// Create simulator and simulate
const simulator = container.get(Simulator);
const timestamp = new Date().getTime();
console.log("Starting simulation");
simulator.simulate()
  .then(() => console.log("done simulating in", (new Date().getTime() - timestamp) / 1000, "s"))
  .then(() => Database.disposeConnection());

