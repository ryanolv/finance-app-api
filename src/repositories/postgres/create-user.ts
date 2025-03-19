import { PostgresHelper } from "../../db/postgres/helper";

interface CreateUserParams {
  ID: string;
  firt_name: string;
  last_name: string;
  email: string;
  password: string;
}

export class PostgresCreateUserRepository {
  async execute(createUserParams: CreateUserParams) {
    const results = await PostgresHelper.query(
      "INSERT INTO users (ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5);",
      [
        createUserParams.firt_name,
        createUserParams.last_name,
        createUserParams.email,
        createUserParams.password,
      ],
    );

    return results;
  }
}
