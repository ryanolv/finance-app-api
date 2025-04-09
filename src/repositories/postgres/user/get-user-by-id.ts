import { PostgresHelper } from "../../../db/postgres/helper.js";
import { GetUserByIdRepository } from "../../../interfaces/repositories/user.js";
import { CreatedUser } from "../../../types/user.js";

export class PostgresGetUserByIdRepository implements GetUserByIdRepository {
  async execute(userId: string): Promise<CreatedUser> {
    const user = await PostgresHelper.query(
      "SELECT * FROM users WHERE id = $1",
      [userId],
    );
    return user[0] as CreatedUser;
  }
}
