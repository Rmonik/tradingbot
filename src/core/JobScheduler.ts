import { inject, injectable } from "inversify";
import { addTime } from "../utils/TimeUtils.js";
import { Constructor, TimeUnit } from "../utils/types.js";
import { ContainerIdentifiers } from "./Container/ContainerIdentifiers.js";
import { Cron } from "./Cron.js";
import { DateService } from "./DateService.js";
import { IContainerManager, IJob } from "./types.js";
import { Job } from "./Job.js";


@injectable()
export class JobScheduler {
  
  public constructor(
    private readonly cron: Cron,
    private readonly dateService: DateService,
    @inject(ContainerIdentifiers.ContainerManager) private readonly containerManager: IContainerManager,
  ) { }

  private scheduleCron(cron: string, jobConstructor: Constructor<IJob>): void {
    const container = this.containerManager.getContainer();
    container.bind(jobConstructor).toSelf();
    const job = container.get<IJob>(jobConstructor);
    this.cron.scheduleCron(cron, job.run.bind(job));
  }

  private scheduleDate(date: Date,  job: IJob): void {
    this.cron.scheduleDate(date, job.run.bind(job));
  }

  public initSchedules(): void {
    this.scheduleCron("*/10 * * * * *", Job);
  }

  public queueTask(job: IJob, delayms?: number): void {
    this.scheduleDate(addTime(new Date(), delayms ?? 0, TimeUnit.Milliseconds), job);
  }

  public gracefulShutdown(timeLimitMs: number): void {
    this.cron.gracefulShutdown(timeLimitMs);
  }
}