import { CreateUserRequest, HttpResponse } from "../../types";

export interface CreateUserControllerInterface {
  execute(httpRequest: CreateUserRequest): Promise<HttpResponse>;
}
