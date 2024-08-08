import { IJob } from "./types";


export class JobTest implements IJob {

  public static create(): JobTest {
    return new JobTest();
  }
  public async run() {
    console.log("Do something");
  }
  
}