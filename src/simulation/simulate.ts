import { ContainerManager } from "../core/ContainerManager";
import { ResolutionMode } from "../core/types";
import { Simulator } from "./Simulator";


// Create DI Container
const containerManager = new ContainerManager();
containerManager.init(ResolutionMode.Simulation);
const container = containerManager.getContainer();

// Create simulator and simulate
const simulator = container.get(Simulator);
simulator.simulate();