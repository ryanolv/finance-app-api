import { v4 as uuidv4 } from "uuid";

import { UserNotFoundError } from "../../errors/user.js";
import {
  PostgresCreateTransactionRepository,
  PostgresGetUserByIdRepository,
} from "../../repositories/postgres/index.js";
import { CreateTransactionParams } from "../../types/index.js";

export class CreateTransactionUseCase {
  private createTransactionRepository: PostgresCreateTransactionRepository;
  private getUserByIdRepository: PostgresGetUserByIdRepository;

  constructor(
    createTransactionRepository: PostgresCreateTransactionRepository,
    getUserByIdRepository: PostgresGetUserByIdRepository,
  ) {
    this.createTransactionRepository = createTransactionRepository;
    this.getUserByIdRepository = getUserByIdRepository;
  }

  async execute(createTransactionParams: Omit<CreateTransactionParams, "id">) {
    const userId = createTransactionParams.user_id;

    const user = await this.getUserByIdRepository.execute(userId);
    if (!user) {
      throw new UserNotFoundError(userId);
    }

    const transactionId = uuidv4();

    const transaction = await this.createTransactionRepository.execute({
      ...createTransactionParams,
      id: transactionId,
    });

    return transaction;
  }
}
