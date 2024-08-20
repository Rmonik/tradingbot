import { Container, injectable } from "inversify";
import "reflect-metadata";
import { registerSimulationContainerServices } from "../../simulation/simulationContainerRegistry.js";
import { isDefined } from "../../utils/TypeUtils.js";
import { IContainerManager, ResolutionMode } from "../types.js";
import { ContainerIdentifiers } from "./ContainerIdentifiers.js";
import { registerContainerServices } from "./ContainerRegistry.js";


@injectable()
export class ContainerManager implements IContainerManager {

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
    container.bind<IContainerManager>(ContainerIdentifiers.ContainerManager).toConstantValue(this);
  }

  public getContainer(): Container {
    if(!isDefined(this.container)) throw new Error("Container is not properly initialized");
    return this.container;
  }
}

let containerManager: ContainerManager | undefined;


export function getContainer(): Container {
  if(!isDefined(containerManager)) throw new Error("ContainerManager is not properly initialized");
  const container = containerManager.getContainer();
  return container;
}
