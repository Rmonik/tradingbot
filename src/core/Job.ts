import { inject, injectable } from "inversify";
import { IJob, ResolutionMode } from "./types.js";
import { ContainerIdentifiers } from "./Container/ContainerIdentifiers.js";

@injectable()
export class Job implements IJob {

  public constructor(
    @inject(ContainerIdentifiers.ResulotionMode) private readonly t: ResolutionMode
  ) { }

  public async run(): Promise<void> {
    console.log(this.t)
  }
  
}