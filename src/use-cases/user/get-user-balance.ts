import { UserNotFoundError } from "../../errors/user.js";
import {
  GetUserBalanceRepository,
  GetUserByIdRepository,
} from "../../interfaces/repositories/user";
import { GetUserBalanceUseCaseInterface } from "../../interfaces/use-cases/user";
import { BalanceOfUser } from "../../types";

export class GetUserBalanceUseCase implements GetUserBalanceUseCaseInterface {
  constructor(
    private readonly getUserBalanceRepository: GetUserBalanceRepository,
    private readonly getUserByIdRepository: GetUserByIdRepository,
  ) {}

  async execute(userId: string): Promise<BalanceOfUser> {
    const user = await this.getUserByIdRepository.execute(userId);
    if (!user) {
      throw new UserNotFoundError(userId);
    }
    return await this.getUserBalanceRepository.execute(userId);
  }
}
