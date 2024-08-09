import { IOrder, ITransactionExecutor } from "../transactions/types";


export class TransactionExecutorSimulation implements ITransactionExecutor {
  makeTransaction(order: IOrder): Promise<void> {
    // Just store this stuff in DB
    throw new Error("Method not implemented.");
  }
  
}