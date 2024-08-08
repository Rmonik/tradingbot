import { addTime } from "../utils/TimeUtils";
import { TimeUnit } from "../utils/types";
import { Cron } from "./Cron";
import { DateService } from "./DateService";
import { JobTest } from "./Job";
import { IJob } from "./types";

export class JobScheduler {

  public static create(): JobScheduler {
    return new JobScheduler(
      Cron.create(),
      DateService.create(),
    );
  }
  
  public constructor(
    private readonly cron: Cron,
    private readonly dateService: DateService,
  ) { }

  private scheduleCron(cron: string, job: IJob): void {
    this.cron.scheduleCron(cron, job.run);
  }

  private scheduleDate(date: Date, job: IJob): void {
    this.cron.scheduleDate(date, job.run);
  }

  public initSchedules(): void {
    this.scheduleCron("*/3 * * * * *", JobTest.create());
  }


  public queueTask(job: IJob, delayms?: number): void {
    this.scheduleDate(addTime(new Date(), delayms ?? 0, TimeUnit.Milliseconds), job);
  }

  public gracefulShutdown(timeLimitMs: number): void {
    this.cron.gracefulShutdown(timeLimitMs);
  }
}