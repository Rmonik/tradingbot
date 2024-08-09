import { NotImplementedError } from "../utils/Errors";
import { IOrder, ITransactionExecutor } from "./types";


export class TransactionExecutor implements ITransactionExecutor {


  public makeTransaction(order: IOrder): Promise<void> {
    throw new NotImplementedError();
  }

  
}