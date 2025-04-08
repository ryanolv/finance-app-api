import { PostgresGetTransactionByIdRepository } from "../../repositories/postgres/index.js";

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
