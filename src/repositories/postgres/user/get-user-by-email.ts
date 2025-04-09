import { PostgresHelper } from "../../../db/postgres/helper.js";
import { GetUserByEmailRepository } from "../../../interfaces/repositories/user.js";
import { User } from "../../../types/user.js";

export class PostgresGetUserByEmailRepository
  implements GetUserByEmailRepository
{
  async execute(email: string): Promise<User> {
    const user = await PostgresHelper.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );
    return user[0] as User;
  }
}
