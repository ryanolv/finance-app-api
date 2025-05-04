import { DeleteUserRepository } from "../../interfaces/repositories/user.js";
import { DeleteUserUseCaseInterface } from "../../interfaces/use-cases/user.js";
import { User } from "../../types/user.js";

export class DeleteUserUseCase implements DeleteUserUseCaseInterface {
  private deleteUserRepository: DeleteUserRepository;

  constructor(deleteUserRepository: DeleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository;
  }

  async execute(userId: string): Promise<User> {
    const deletedUser = await this.deleteUserRepository.execute(userId);
    return deletedUser;
  }
}
