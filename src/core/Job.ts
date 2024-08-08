import { IJob } from "./types";


export class JobTest implements IJob {

  public static create(): JobTest {
    return new JobTest();
  }
  public async run(): Promise<void> {
    console.log("Do something");
  }
  
}