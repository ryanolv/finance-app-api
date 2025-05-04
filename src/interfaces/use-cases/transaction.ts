import {
  CreateTransactionParams,
  Transaction,
  UpdateTransactionParams,
} from "../../types";

export interface CreateTransactionUseCaseInterface {
  execute(
    createTransactionParams: Omit<CreateTransactionParams, "id">,
  ): Promise<Transaction>;
}

export interface DeleteTransactionUseCaseInterface {
  execute(transactionId: string): Promise<Transaction>;
}

export interface GetTransactionByIdUseCaseInterface {
  execute(transactionId: string): Promise<Transaction>;
}

export interface UpdateTransactionUseCaseInterface {
  execute(
    transactionId: string,
    updateTransactionParams: UpdateTransactionParams,
  ): Promise<Transaction>;
}
