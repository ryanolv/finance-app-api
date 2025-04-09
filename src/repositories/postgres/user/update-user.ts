import { PostgresHelper } from "../../../db/postgres/helper.js";
import { UpdateUserRepository } from "../../../interfaces/repositories/user.js";
import { UpdateUserParams, User } from "../../../types/index.js";

export class PostgresUpdateUserRepository implements UpdateUserRepository {
  async execute(
    userId: string,
    updatedUserParams: UpdateUserParams,
  ): Promise<User> {
    const updateFields: string[] = [];
    const updateValues: string[] = [];

    Object.keys(updatedUserParams).forEach((key) => {
      const typedKey = key as keyof UpdateUserParams;
      updateFields.push(`${key} = $${updateValues.length + 1}`);
      updateValues.push(updatedUserParams[typedKey] as string);
    });
    updateValues.push(userId);

    const updateQuery = `
        UPDATE users
        SET  ${updateFields.join(", ")}
        WHERE id = $${updateValues.length}
        RETURNING *
    `;

    const updatedUser = await PostgresHelper.query(updateQuery, updateValues);
    return updatedUser[0] as User;
  }
}
