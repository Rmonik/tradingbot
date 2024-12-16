import { injectable } from "inversify";
import { SimulationConfigProvider } from "../SimulationConfigProvider.js";
import { isDefined } from "../../utils/TypeUtils.js";

@injectable()
export class SimulationDateProvider {

    private date: null | Date = null; 

    public constructor(
        private readonly simulationConfigProvider: SimulationConfigProvider,
    ) {}

    public getCurrentDate(): Date {
        if(!isDefined(this.date)) this.date = this.simulationConfigProvider.getSimulationInterval().start;
        return this.date;
    }

    public resetDate(): void {
        this.date = null;
    }

    public setDate(date: Date): void {
        this.date = date;
    }

}