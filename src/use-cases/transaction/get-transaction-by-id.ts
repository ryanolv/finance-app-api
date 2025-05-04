import { GetTransactionByIdRepository } from "../../interfaces/repositories/transaction.js";
import { GetTransactionByIdUseCaseInterface } from "../../interfaces/use-cases/transaction.js";
import { Transaction } from "../../types/transaction.js";

export class GetTransactionByIdUseCase
  implements GetTransactionByIdUseCaseInterface
{
  private getTransactionByIdRepository: GetTransactionByIdRepository;

  constructor(getTransactionByIdRepository: GetTransactionByIdRepository) {
    this.getTransactionByIdRepository = getTransactionByIdRepository;
  }

  async execute(transactionId: string): Promise<Transaction> {
    const transaction =
      await this.getTransactionByIdRepository.execute(transactionId);

    return transaction;
  }
}
