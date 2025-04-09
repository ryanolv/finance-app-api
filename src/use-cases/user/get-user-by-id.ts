import { GetUserByIdRepository } from "../../interfaces/repositories/user.js";

export class GetUserByIdUseCase {
  private getUserByIdRepository: GetUserByIdRepository;
  constructor(getUserByIdRepository: GetUserByIdRepository) {
    this.getUserByIdRepository = getUserByIdRepository;
  }
  async execute(userId: string) {
    const user = await this.getUserByIdRepository.execute(userId);
    return user;
  }
}
