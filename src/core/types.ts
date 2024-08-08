export interface IJob {
  readonly run: () => Promise<void>;
}