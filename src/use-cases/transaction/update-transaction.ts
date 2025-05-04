import { TransactionNotFoundError } from "../../errors/transaction.js";
import {
  GetTransactionByIdRepository,
  UpdateTransactionRepository,
} from "../../interfaces/repositories/transaction.js";
import { UpdateTransactionUseCaseInterface } from "../../interfaces/use-cases/transaction.js";
import { Transaction, UpdateTransactionParams } from "../../types/index.js";

export class UpdateTransactionUseCase
  implements UpdateTransactionUseCaseInterface
{
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
  ): Promise<Transaction> {
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
