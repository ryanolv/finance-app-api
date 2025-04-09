import { PostgresHelper } from "../../../db/postgres/helper.js";
import { DeleteUserRepository } from "../../../interfaces/repositories/user.js";
import { CreatedUser } from "../../../types/user.js";

export class PostgresDeleteUserRepository implements DeleteUserRepository {
  async execute(userId: string): Promise<CreatedUser> {
    const deletedUser = await PostgresHelper.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [userId],
    );

    return deletedUser[0] as CreatedUser;
  }
}
