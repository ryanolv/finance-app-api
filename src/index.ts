import "dotenv/config";
import express from "express";

import { CreateUserController } from "./controllers/create-user.js";
import { GetUserByIdController } from "./controllers/get-user-by-id.js";

const app = express();
app.use(express.json());

app.post("/api/users", async (request, response) => {
  const createUserController = new CreateUserController();
  const { statusCode, body } = await createUserController.execute(request);

  response.status(statusCode).send(body);
});

app.get("/api/users/:userId", async (request, response) => {
  const getUserByIdController = new GetUserByIdController();
  const { statusCode, body } = await getUserByIdController.execute(request);
  response.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
