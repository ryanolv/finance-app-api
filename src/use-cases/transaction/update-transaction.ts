import { TransactionNotFoundError } from "../../errors/transaction.js";
import {
  GetTransactionByIdRepository,
  UpdateTransactionRepository,
} from "../../interfaces/repositories/transaction.js";
import { UpdateTransactionParams } from "../../types/index.js";

export class UpdateTransactionUseCase {
  private updateTransactionRepository: UpdateTransactionRepository;
  private getTransactionByIdRepository: GetTransactionByIdRepository;

  constructor(
    updateTransactionRepository: UpdateTransactionRepository,
    getTransactionByIdRepository: GetTransactionByIdRepository,
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
