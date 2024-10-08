
export class SimulationEndError extends Error {
  constructor(message: string) {
    super(`Simulation ended with message: ${message}`);
  }
}