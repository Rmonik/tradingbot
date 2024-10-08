import { randomUUID } from "crypto";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers.js";
import { ContainerManager } from "../core/Container/ContainerManager.js";
import { ResolutionMode } from "../core/types.js";
import { Simulator } from "./Simulator.js";


// Create DI Container
const containerManager = new ContainerManager();
containerManager.init(ResolutionMode.Simulation);
const container = containerManager.getContainer();

// generate db name
container.bind(ContainerIdentifiers.DatabaseName).toConstantValue(`simulation-${randomUUID()}`);

// Create simulator and simulate
const simulator = container.get(Simulator);
const timestamp = new Date().getTime();
simulator.simulate()
  .then(() => console.log("done simulating in", (new Date().getTime() - timestamp) / 1000, "s"))

