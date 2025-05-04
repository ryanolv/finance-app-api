import { DeleteTransactionRepository } from "../../interfaces/repositories/transaction.js";

export class DeleteTransactionUseCase {
  private deleteTransactionRepository: DeleteTransactionRepository;

  constructor(deleteTransactionRepository: DeleteTransactionRepository) {
    this.deleteTransactionRepository = deleteTransactionRepository;
  }

  async execute(transactionId: string) {
    const deletedTransaction =
      await this.deleteTransactionRepository.execute(transactionId);
    return deletedTransaction;
  }
}
