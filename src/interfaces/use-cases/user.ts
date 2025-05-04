import {
  User,
  CreateUserUseCaseParams,
  UpdateUserParams,
} from "../../types/index.js";

export interface CreateUserUseCaseInterface {
  execute(createUserParams: CreateUserUseCaseParams): Promise<User>;
}

export interface DeleteUserUseCaseInterface {
  execute(userId: string): Promise<User>;
}

export interface GetUserByIdUseCaseInterface {
  execute(userId: string): Promise<User>;
}

export interface UpdateUserUseCaseInterface {
  execute(userId: string, updateUserParams: UpdateUserParams): Promise<User>;
}
