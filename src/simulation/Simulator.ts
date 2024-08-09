import { injectable } from "inversify";


@injectable()
export class Simulator {

  public simulate(): void {
    console.log('Simulating...');
  }
}