import { UpdateUserParams, User } from "../../types/index.js";

export interface UpdateUserUseCaseInterface {
  execute: (
    userId: string,
    updateUserParams: UpdateUserParams,
  ) => Promise<User>;
}

export interface UseCase<Input, Output> {
  execute(input: Input): Promise<Output>;
}
