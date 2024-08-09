import { Container } from "inversify";
import "reflect-metadata";
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
      registerSimulationContainerServices(childContainer);
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

export function initContainer(resolutionMode: ResolutionMode): void {
  containerManager = new ContainerManager();
  containerManager.init(resolutionMode);
}

export function getContainer(): Container {
  if(!isDefined(containerManager)) throw new Error("ContainerManager is not properly initialized");
  const container = containerManager.getContainer();
  return container;
}
