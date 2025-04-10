import { DeleteUserRepository } from "../../interfaces/repositories/user.js";
import { UseCase } from "../../interfaces/use-cases/user.js";
import { User } from "../../types/user.js";

export class DeleteUserUseCase implements UseCase<string, User> {
  private deleteUserRepository: DeleteUserRepository;

  constructor(deleteUserRepository: DeleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository;
  }

  async execute(userId: string): Promise<User> {
    const deletedUser = await this.deleteUserRepository.execute(userId);
    return deletedUser;
  }
}
