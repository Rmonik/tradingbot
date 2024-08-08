import { scheduleJob } from "node-schedule";

export class Cron {

  public static create(): Cron {
    return new Cron();
  }

  public constructor(
  ) { }

  public scheduleCron(cron: string, cb: () => Promise<void>): void {
    scheduleJob(cron, async () => await cb());
  }

  public scheduleDate(date: Date, cb: () => Promise<void>): void {
    scheduleJob(date, async () => await cb());
  }
}