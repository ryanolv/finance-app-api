import { GetTransactionByIdRepository } from "../../interfaces/repositories/transaction.js";

export class GetTransactionByIdUseCase {
  private getTransactionByIdRepository: GetTransactionByIdRepository;

  constructor(getTransactionByIdRepository: GetTransactionByIdRepository) {
    this.getTransactionByIdRepository = getTransactionByIdRepository;
  }

  async execute(transactionId: string) {
    const transaction =
      await this.getTransactionByIdRepository.execute(transactionId);

    return transaction;
  }
}
