import { CreatedUser, CreateUserParams } from "../../types/index.js";

export interface CreateUserRepository {
  execute(createUserParams: CreateUserParams): Promise<CreatedUser>;
}
