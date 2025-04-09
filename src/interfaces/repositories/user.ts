import { User, CreateUserParams } from "../../types/index.js";

export interface CreateUserRepository {
  execute(createUserParams: CreateUserParams): Promise<User>;
}

export interface GetUserByIdRepository {
  execute(userId: string): Promise<User>;
}

export interface GetUserByEmailRepository {
  execute(email: string): Promise<User>;
}

export interface DeleteUserRepository {
  execute(userId: string): Promise<User>;
}
