import {
  CreateTransactionRequest,
  DeleteTransactionRequest,
  GetTransactionByIdRequest,
  HttpResponse,
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
