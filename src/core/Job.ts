import { IJob } from "./types";


export class JobTest implements IJob {

  public static create(): JobTest {
    return new JobTest();
  }
  public async run(): Promise<void> {
    await Promise.resolve();
    const d = new Date();
    console.log("Running job");
    await new Promise((resolve) => setTimeout(resolve, 15000));
    console.log("Job done after", new Date().getTime() - d.getTime(), "ms");
  }
  
}