import { CreateTransactionParams, Transaction } from "../../types";

export interface CreateTransactionUseCaseInterface {
  execute(
    createTransactionParams: Omit<CreateTransactionParams, "id">,
  ): Promise<Transaction>;
}

export interface DeleteTransactionUseCaseInterface {
  execute(transactionId: string): Promise<Transaction>;
}
