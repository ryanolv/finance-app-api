import { v4 as uuidv4 } from "uuid";

import { UserNotFoundError } from "../../errors/user.js";
import { CreateTransactionParams } from "../../types/index.js";
import { GetUserByIdRepository } from "../../interfaces/repositories/user.js";
import { CreateTransactionRepository } from "../../interfaces/repositories/transaction.js";

export class CreateTransactionUseCase {
  private createTransactionRepository: CreateTransactionRepository;
  private getUserByIdRepository: GetUserByIdRepository;

  constructor(
    createTransactionRepository: CreateTransactionRepository,
    getUserByIdRepository: GetUserByIdRepository,
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
