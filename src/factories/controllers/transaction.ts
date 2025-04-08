import { CreateTransactionController } from "../../controllers/index.js";
import { GetTransactionByIdController } from "../../controllers/transaction/get-transaction-by-id.js";
import {
  PostgresCreateTransactionRepository,
  PostgresGetUserByIdRepository,
} from "../../repositories/postgres/index.js";
import { PostgresGetTransactionByIdRepository } from "../../repositories/postgres/transaction/get-transaction-by-id.js";
import { CreateTransactionUseCase } from "../../use-cases/index.js";
import { GetTransactionByIdUseCase } from "../../use-cases/transaction/get-transaction-by-id.js";

export const makeCreateTransactionController = () => {
  const createTransactionRepository = new PostgresCreateTransactionRepository();
  const getUserByIdRepository = new PostgresGetUserByIdRepository();

  const createTransactionUseCase = new CreateTransactionUseCase(
    createTransactionRepository,
    getUserByIdRepository,
  );

  const createTransactionController = new CreateTransactionController(
    createTransactionUseCase,
  );
  return createTransactionController;
};

export const makeGetTransactionByIdController = () => {
  const getTransactionByIdRepository =
    new PostgresGetTransactionByIdRepository();
  const getTransactionByIdUseCase = new GetTransactionByIdUseCase(
    getTransactionByIdRepository,
  );
  const getTransactionByIdController = new GetTransactionByIdController(
    getTransactionByIdUseCase,
  );
  return getTransactionByIdController;
};
