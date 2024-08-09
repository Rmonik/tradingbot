import { Container } from "inversify";
import { ResolutionMode } from "./types";
import { registerSimulationContainerServices } from "../simulation/simulationContainerRegistry";
import { isDefined } from "../utils/TypeUtils";
import { registerContainerServices } from "./ContainerRegistry";


class ContainerManager {

  public constructor() { }

  private container: Container | undefined;

  public init(resulotionMode: ResolutionMode): void  {
    const container = new Container();
    registerContainerServices(container);
    if(resulotionMode === ResolutionMode.Simulation) {
      const childContainer = container.createChild();
      registerSimulationContainerServices(container);
      this.container = childContainer;
    } else {
      this.container = container
    }
  }

  public getContainer(): Container {
    if(!isDefined(this.container)) throw new Error("Container is not properly initialized");
    return this.container;
  }
}

let containerManager: ContainerManager | undefined;

export function initContainer(): void {
  containerManager = new ContainerManager();
}

export function getContainer(): Container {
  if(!isDefined(containerManager)) throw new Error("ContainerManager is not properly initialized");
  return containerManager.getContainer();
}
