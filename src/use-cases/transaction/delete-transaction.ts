import { PostgresDeleteTransactionRepository } from "../../repositories/postgres/index.js";

export class DeleteTransactionUseCase {
  private deleteTransactionRepository: PostgresDeleteTransactionRepository;

  constructor(
    deleteTransactionRepository: PostgresDeleteTransactionRepository,
  ) {
    this.deleteTransactionRepository = deleteTransactionRepository;
  }

  async execute(transactionId: string) {
    const deletedTransaction =
      await this.deleteTransactionRepository.execute(transactionId);
    return deletedTransaction;
  }
}
