import { CreateTransactionParams, Transaction } from "../../types";

export interface CreateTransactionRepository {
  execute(
    createTransactionParams: CreateTransactionParams,
  ): Promise<Transaction>;
}
