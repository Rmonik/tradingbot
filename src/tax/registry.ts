import { Container } from "inversify";
import { TaxConfigProvider } from "./TaxConfigProvider.js";
import { TaxCalculator } from "./TaxCalculator.js";


export function registerTaxServices(container: Container) {
  container.bind(TaxConfigProvider).toSelf();
  container.bind(TaxCalculator).toSelf();
}