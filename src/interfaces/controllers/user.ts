import {
  CreateUserRequest,
  DeleteUserRequest,
  HttpResponse,
} from "../../types";

export interface CreateUserControllerInterface {
  execute(httpRequest: CreateUserRequest): Promise<HttpResponse>;
}

export interface DeleteUserControllerInterface {
  execute(httpRequest: DeleteUserRequest): Promise<HttpResponse>;
}
