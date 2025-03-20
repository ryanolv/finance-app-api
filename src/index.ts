import "dotenv/config";
import express from "express";

import {
  CreateUserController,
  DeleteUserController,
  GetUserByIdController,
  UpdateUserController,
} from "./controllers/index.js";
import { PostgresGetUserByIdRepository } from "./repositories/postgres/get-user-by-id.js";
import { CreateUserUseCase, GetUserByIdUseCase } from "./use-cases/index.js";
import { PostgresCreateUserRepository } from "./repositories/postgres/index.js";

const app = express();
app.use(express.json());

app.get("/api/users/:userId", async (request, response) => {
  const getUserByIdRepository = new PostgresGetUserByIdRepository();
  const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
  const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
  const { statusCode, body } = await getUserByIdController.execute(request);
  response.status(statusCode).send(body);
});

app.post("/api/users", async (request, response) => {
  const createUserRepository = new PostgresCreateUserRepository();
  const getUserByIdRepository = new PostgresGetUserByIdRepository();
  const createUserUseCase = new CreateUserUseCase(
    createUserRepository,
    getUserByIdRepository,
  );
  const createUserController = new CreateUserController(createUserUseCase);
  const { statusCode, body } = await createUserController.execute(request);

  response.status(statusCode).send(body);
});

app.patch("/api/users/:userId", async (request, response) => {
  const updateUserController = new UpdateUserController();
  const { statusCode, body } = await updateUserController.execute(request);

  response.status(statusCode).send(body);
});

app.delete("/api/users/:userId", async (request, response) => {
  const deleteUserController = new DeleteUserController();
  const { statusCode, body } = await deleteUserController.execute(request);
  response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
