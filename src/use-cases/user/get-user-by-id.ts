import { GetUserByIdRepository } from "../../interfaces/repositories/user.js";
import { UseCase } from "../../interfaces/use-cases/user.js";
import { User } from "../../types/index.js";

export class GetUserByIdUseCase implements UseCase<string, User | null> {
  private getUserByIdRepository: GetUserByIdRepository;
  constructor(getUserByIdRepository: GetUserByIdRepository) {
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(userId: string): Promise<User | null> {
    const user = await this.getUserByIdRepository.execute(userId);
    return user;
  }
}
