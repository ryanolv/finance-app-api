import {
  CreateTransactionParams,
  Transaction,
  UpdateTransactionParams,
} from "../../types";

export interface CreateTransactionRepository {
  execute(
    createTransactionParams: CreateTransactionParams,
  ): Promise<Transaction>;
}

export interface DeleteTransactionRepository {
  execute(transactionId: string): Promise<Transaction>;
}

export interface GetTransactionByIdRepository {
  execute(transactionId: string): Promise<Transaction>;
}

export interface UpdateTransactionRepository {
  execute(
    transactionId: string,
    updateTransactionParams: UpdateTransactionParams,
  ): Promise<Transaction>;
}
