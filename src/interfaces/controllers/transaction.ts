import {
  CreateTransactionRequest,
  DeleteTransactionRequest,
  GetTransactionByIdRequest,
  HttpResponse,
  UpdateTransactionRequest,
} from "../../types";

export interface CreateTransactionControllerInterface {
  execute(httpRequest: CreateTransactionRequest): Promise<HttpResponse>;
}

export interface DeleteTransactionControllerInterface {
  execute(httpRequest: DeleteTransactionRequest): Promise<HttpResponse>;
}

export interface GetTransactionByIdControllerInterface {
  execute(httpRequest: GetTransactionByIdRequest): Promise<HttpResponse>;
}

export interface UpdateTransactionControllerInterface {
  execute(httpRequest: UpdateTransactionRequest): Promise<HttpResponse>;
}
