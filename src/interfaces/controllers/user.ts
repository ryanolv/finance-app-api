import {
  CreateUserRequest,
  DeleteUserRequest,
  GetUserByIdRequest,
  HttpResponse,
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
