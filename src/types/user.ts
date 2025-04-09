import { HttpRequest } from "./index.js";

export type CreateUserParams = {
  ID: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type UpdateUserParams = {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
};

export type CreateUserRequest = HttpRequest<Omit<CreateUserParams, "ID">>;

export type DeleteUserRequest = HttpRequest<null, { userId: string }>;

export type GetUserByIdRequest = HttpRequest<null, { userId: string }>;

export type UpdateUserRequest = HttpRequest<
  UpdateUserParams,
  { userId: string }
>;
