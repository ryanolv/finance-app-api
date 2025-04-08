import { PostgresDeleteUserRepository } from "../../repositories/postgres/index.js";

export class DeleteUserUseCase {
  private deleteUserRepository: PostgresDeleteUserRepository;

  constructor(deleteUserRepository: PostgresDeleteUserRepository) {
    this.deleteUserRepository = deleteUserRepository;
  }

  async execute(userId: string) {
    const deletedUser = await this.deleteUserRepository.execute(userId);
    return deletedUser;
  }
}
