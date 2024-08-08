import { Cron } from "./Cron";
import { JobTest } from "./Job";
import { IJob } from "./types";

export class JobScheduler {

  public static create(): JobScheduler {
    return new JobScheduler(Cron.create());
  }
  
  public constructor(
    private readonly cron: Cron,
  ) { }

  private scheduleCron(cron: string, job: IJob): void {
    this.cron.scheduleCron(cron, job.run);
  }

  public initSchedules(): void {
    this.scheduleCron("*/3 * * * * *", JobTest.create());

  }
}