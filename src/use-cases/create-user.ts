import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import {
  CreateUserParams,
  PostgresCreateUserRepository,
} from "../repositories/postgres/create-user";

export class CreateUserUseCase {
  async execute(createUserParams: CreateUserParams) {
    // TODO: verify by email if user already exists
    // create ID for user
    const userId = uuidv4();
    // criptografing password

    const hashedPassword = await bcrypt.hash(createUserParams.password, 10);
    //  insert user in database

    const user = {
      ...createUserParams,
      id: userId,
      password: hashedPassword,
    };

    const postgresCreateUserRepository = new PostgresCreateUserRepository();
    const createdUser = await postgresCreateUserRepository.execute(user);

    return createdUser;
  }
}
