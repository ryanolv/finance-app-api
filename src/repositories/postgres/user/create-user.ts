import { PostgresHelper } from "../../../db/postgres/helper.js";
import { CreateUserParams } from "../../../types/index.js";

interface CreateUserRepository {
  execute: (createUserParams: CreateUserParams) => Promise<object>;
}

export class PostgresCreateUserRepository implements CreateUserRepository {
  async execute(createUserParams: CreateUserParams) {
    await PostgresHelper.query(
      "INSERT INTO users (ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5);",
      [
        createUserParams.ID,
        createUserParams.first_name,
        createUserParams.last_name,
        createUserParams.email,
        createUserParams.password,
      ],
    );

    const createdUser = await PostgresHelper.query(
      "SELECT * FROM users WHERE ID = $1;",
      [createUserParams.ID],
    );

    return createdUser[0];
  }
}
