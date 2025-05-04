import { DeleteTransactionRepository } from "../../interfaces/repositories/transaction.js";
import { DeleteTransactionUseCaseInterface } from "../../interfaces/use-cases/transaction.js";
import { Transaction } from "../../types/transaction.js";

export class DeleteTransactionUseCase
  implements DeleteTransactionUseCaseInterface
{
  private deleteTransactionRepository: DeleteTransactionRepository;

  constructor(deleteTransactionRepository: DeleteTransactionRepository) {
    this.deleteTransactionRepository = deleteTransactionRepository;
  }

  async execute(transactionId: string): Promise<Transaction> {
    const deletedTransaction =
      await this.deleteTransactionRepository.execute(transactionId);
    return deletedTransaction;
  }
}
