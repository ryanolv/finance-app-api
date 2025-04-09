import { PostgresHelper } from "../../../db/postgres/helper.js";
import { DeleteUserRepository } from "../../../interfaces/repositories/user.js";
import { User } from "../../../types/user.js";

export class PostgresDeleteUserRepository implements DeleteUserRepository {
  async execute(userId: string): Promise<User> {
    const deletedUser = await PostgresHelper.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [userId],
    );

    return deletedUser[0] as User;
  }
}
