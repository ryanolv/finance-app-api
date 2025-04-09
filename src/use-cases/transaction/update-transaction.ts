import { TransactionNotFoundError } from "../../errors/transaction.js";
import {
  PostgresGetTransactionByIdRepository,
  PostgresUpdateTransactionRepository,
} from "../../repositories/postgres/index.js";
import { UpdateTransactionParams } from "../../types/index.js";

export class UpdateTransactionUseCase {
  private updateTransactionRepository: PostgresUpdateTransactionRepository;
  private getTransactionByIdRepository: PostgresGetTransactionByIdRepository;

  constructor(
    updateTransactionRepository: PostgresUpdateTransactionRepository,
    getTransactionByIdRepository: PostgresGetTransactionByIdRepository,
  ) {
    this.updateTransactionRepository = updateTransactionRepository;
    this.getTransactionByIdRepository = getTransactionByIdRepository;
  }

  async execute(
    transactionId: string,
    updateTransactionParams: UpdateTransactionParams,
  ) {
    const transaction =
      await this.getTransactionByIdRepository.execute(transactionId);

    if (!transaction) {
      throw new TransactionNotFoundError(transactionId);
    }

    const updatedTransaction = await this.updateTransactionRepository.execute(
      transactionId,
      updateTransactionParams,
    );

    return updatedTransaction;
  }
}
