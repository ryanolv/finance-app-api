import {
  CreateTransactionController,
  DeleteTransactionController,
  GetTransactionByIdController,
  UpdateTransactionController,
} from "../../controllers/index.js";
import {
  PostgresCreateTransactionRepository,
  PostgresGetUserByIdRepository,
  PostgresGetTransactionByIdRepository,
  PostgresUpdateTransactionRepository,
  PostgresDeleteTransactionRepository,
} from "../../repositories/postgres/index.js";
import {
  CreateTransactionUseCase,
  DeleteTransactionUseCase,
  GetTransactionByIdUseCase,
  UpdateTransactionUseCase,
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

export const makeUpdateTransactionController = () => {
  const updateTransactionRepository = new PostgresUpdateTransactionRepository();
  const getTransactionByIdRepository =
    new PostgresGetTransactionByIdRepository();

  const updateTransactionUseCase = new UpdateTransactionUseCase(
    updateTransactionRepository,
    getTransactionByIdRepository,
  );

  const updateTransactionController = new UpdateTransactionController(
    updateTransactionUseCase,
  );
  return updateTransactionController;
};

export const makeDeleteTransactionController = () => {
  const deleteTransactionRepository = new PostgresDeleteTransactionRepository();
  const deleteTransactionUseCase = new DeleteTransactionUseCase(
    deleteTransactionRepository,
  );
  const deleteTransactionController = new DeleteTransactionController(
    deleteTransactionUseCase,
  );
  return deleteTransactionController;
};
