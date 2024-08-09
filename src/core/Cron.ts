import { injectable } from "inversify";
import { scheduleJob, gracefulShutdown } from "node-schedule";

@injectable()
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

  public gracefulShutdown(timeLimitMs: number): void {
    console.log("Starting graceful shutdown, will hard shutdown in", timeLimitMs, "ms if not finished");
    Promise.race([
      this.trueGracfuleShutdown(),
      this.earlyShutdown(timeLimitMs),
    ]).then(() => {
      console.log("exiting...");
      process.exit(0);
    });

  }

  private async trueGracfuleShutdown(): Promise<void> {
    await gracefulShutdown();
    console.log("All jobs have finished, shutting down")
  }

  private async earlyShutdown(timeLimitMs: number): Promise<void> {
    await new Promise(() => setTimeout(
      () => console.log("Jobs took too long to finish, cancelling all jobs and shutting down"),
      timeLimitMs));
    
  }
}