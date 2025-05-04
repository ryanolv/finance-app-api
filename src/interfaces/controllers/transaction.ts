import {
  CreateTransactionRequest,
  DeleteTransactionRequest,
  HttpResponse,
} from "../../types";

export interface CreateTransactionControllerInterface {
  execute(httpRequest: CreateTransactionRequest): Promise<HttpResponse>;
}

export interface DeleteTransactionControllerInterface {
  execute(httpRequest: DeleteTransactionRequest): Promise<HttpResponse>;
}
