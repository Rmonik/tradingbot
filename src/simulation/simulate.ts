import { randomUUID } from "crypto";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { ContainerManager } from "../core/Container/ContainerManager.js";
import { ResolutionMode } from "../core/types.js";
import { Simulator } from "./Simulator.js";
import { disposeConnections } from "../core/Database.js";


// Create DI Container
const containerManager = new ContainerManager();
containerManager.init(ResolutionMode.Simulation);
const container = containerManager.getContainer();

// generate db name
container.bind(ContainerIdentifiers.DatabaseName).toConstantValue(`simulation-${randomUUID()}`);

// Create simulator and simulate
const simulator = container.get(Simulator);
simulator.simulate()
  .then(() => console.log("done simulating"))
  .then(() => disposeConnections())
  .then(() => console.log("closed connections"));

