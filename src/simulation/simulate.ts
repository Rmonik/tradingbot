import { randomUUID } from "crypto";
import { ContainerIdentifiers } from "../core/Container/ContainerIdentifiers";
import { ContainerManager } from "../core/Container/ContainerManager";
import { ResolutionMode } from "../core/types";
import { Simulator } from "./Simulator";


// Create DI Container
const containerManager = new ContainerManager();
containerManager.init(ResolutionMode.Simulation);
const container = containerManager.getContainer();

// generate db name
container.bind(ContainerIdentifiers.DatabaseName).toConstantValue(`simulation-${randomUUID()}`);

// Create simulator and simulate
const simulator = container.get(Simulator);
simulator.simulate().then(() => console.log("done"));