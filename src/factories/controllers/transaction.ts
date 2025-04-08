import {
  CreateTransactionController,
  GetTransactionByIdController,
} from "../../controllers/index.js";
import {
  PostgresCreateTransactionRepository,
  PostgresGetUserByIdRepository,
  PostgresGetTransactionByIdRepository,
} from "../../repositories/postgres/index.js";
import {
  CreateTransactionUseCase,
  GetTransactionByIdUseCase,
} from "../../use-cases/index.js";

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
