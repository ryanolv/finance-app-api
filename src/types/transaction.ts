import { HttpRequest } from "./index.js";

export type CreateTransactionParams = {
  id: string;
  user_id: string;
  name: string;
  date: string;
  amount: string;
  type: string;
};

export type UpdateTransactionParams = {
  name?: string;
  date?: string;
  amount?: string;
  type?: string;
};

export type CreateTransactionRequest = HttpRequest<CreateTransactionParams>;

export type GetTransactionByIdRequest = HttpRequest<
  null,
  { transactionId: string }
>;

export type UpdateTransactionRequest = HttpRequest<
  UpdateTransactionParams,
  { transactionId: string }
>;

export type DeleteTransactionRequest = HttpRequest<
  null,
  { transactionId: string }
>;
