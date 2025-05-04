import { CreateTransactionRequest, HttpResponse } from "../../types";

export interface CreateTransactionControllerInterface {
  execute(httpRequest: CreateTransactionRequest): Promise<HttpResponse>;
}
