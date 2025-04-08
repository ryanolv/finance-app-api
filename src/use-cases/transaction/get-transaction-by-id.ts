import { PostgresGetTransactionByIdRepository } from "../../repositories/postgres/transaction/get-transaction-by-id";

export class GetTransactionByIdUseCase {
  private getTransactionByIdRepository: PostgresGetTransactionByIdRepository;

  constructor(
    getTransactionByIdRepository: PostgresGetTransactionByIdRepository,
  ) {
    this.getTransactionByIdRepository = getTransactionByIdRepository;
  }

  async execute(transactionId: string) {
    const transaction =
      await this.getTransactionByIdRepository.execute(transactionId);

    return transaction;
  }
}
