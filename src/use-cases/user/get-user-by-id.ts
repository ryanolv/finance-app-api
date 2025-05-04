import { GetUserByIdRepository } from "../../interfaces/repositories/user.js";
import { GetUserByIdUseCaseInterface } from "../../interfaces/use-cases/user.js";
import { User } from "../../types/user.js";

export class GetUserByIdUseCase implements GetUserByIdUseCaseInterface {
  private getUserByIdRepository: GetUserByIdRepository;
  constructor(getUserByIdRepository: GetUserByIdRepository) {
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(userId: string): Promise<User> {
    const user = await this.getUserByIdRepository.execute(userId);
    return user;
  }
}
