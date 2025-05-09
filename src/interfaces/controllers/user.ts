import {
  CreateUserRequest,
  DeleteUserRequest,
  GetUserBalanceRequest,
  GetUserByIdRequest,
  HttpResponse,
  UpdateUserRequest,
} from "../../types";

export interface CreateUserControllerInterface {
  execute(httpRequest: CreateUserRequest): Promise<HttpResponse>;
}

export interface DeleteUserControllerInterface {
  execute(httpRequest: DeleteUserRequest): Promise<HttpResponse>;
}

export interface GetUserByIdControllerInterface {
  execute(httpRequest: GetUserByIdRequest): Promise<HttpResponse>;
}

export interface UpdateUserControllerInterface {
  execute(httpRequest: UpdateUserRequest): Promise<HttpResponse>;
}

export interface GetUserBalanceControllerInterface {
  execute(httpRequest: GetUserBalanceRequest): Promise<HttpResponse>;
}
