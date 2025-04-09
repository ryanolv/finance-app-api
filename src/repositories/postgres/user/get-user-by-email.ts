import { PostgresHelper } from "../../../db/postgres/helper.js";
import { GetUserByEmailRepository } from "../../../interfaces/repositories/user.js";
import { CreatedUser } from "../../../types/user.js";

export class PostgresGetUserByEmailRepository
  implements GetUserByEmailRepository
{
  async execute(email: string): Promise<CreatedUser> {
    const user = await PostgresHelper.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
    );
    return user[0] as CreatedUser;
  }
}
