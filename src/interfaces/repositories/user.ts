import { CreatedUser, CreateUserParams } from "../../types/index.js";

export interface CreateUserRepository {
  execute(createUserParams: CreateUserParams): Promise<CreatedUser>;
}

export interface GetUserByIdRepository {
  execute(userId: string): Promise<CreatedUser>;
}

export interface GetUserByEmailRepository {
  execute(email: string): Promise<CreatedUser>;
}
