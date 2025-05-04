import { User, CreateUserUseCaseParams } from "../../types/index.js";

export interface CreateUserUseCaseInterface {
  execute(createUserParams: CreateUserUseCaseParams): Promise<User>;
}
