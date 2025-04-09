import { DeleteUserRepository } from "../../interfaces/repositories/user.js";

export class DeleteUserUseCase {
  private deleteUserRepository: DeleteUserRepository;

  constructor(deleteUserRepository: DeleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository;
  }

  async execute(userId: string) {
    const deletedUser = await this.deleteUserRepository.execute(userId);
    return deletedUser;
  }
}
