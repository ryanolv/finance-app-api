import { HttpRequest } from "./index.js";

export type CreateUserParams = {
  ID: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type CreateUserUseCaseParams = Omit<CreateUserParams, "ID">;

export type UpdateUserParams = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
};

export type CreateUserRequest = HttpRequest<Omit<CreateUserParams, "ID">>;

export type DeleteUserRequest = HttpRequest<null, { userId: string }>;

export type GetUserByIdRequest = HttpRequest<null, { userId: string }>;

export type UpdateUserRequest = HttpRequest<
  UpdateUserParams,
  { userId: string }
>;
