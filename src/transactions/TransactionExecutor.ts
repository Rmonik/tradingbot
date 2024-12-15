import { NotImplementedError } from "../utils/Errors.js";
import { IOrder, ITransactionExecutor } from "./types.js";


export class TransactionExecutor implements ITransactionExecutor {


  public makeTransaction(userId: string, order: IOrder): Promise<void> {
    throw new NotImplementedError();
  }

  
}