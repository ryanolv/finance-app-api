import { PostgresGetUserByIdRepository } from "../repositories/postgres";

export class GetUserByIdUseCase {
  private getUserByIdRepository: PostgresGetUserByIdRepository;
  constructor(getUserByIdRepository: PostgresGetUserByIdRepository) {
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(userId: string) {
    const user = await this.getUserByIdRepository.execute(userId);
    return user;
  }
}
