import { PostgresHelper } from "../../../db/postgres/helper.js";
import { UpdateUserParams } from "../../../use-cases/user/update-user.js";

export class PostgresUpdateUserRepository {
  async execute(userId: string, updatedUserParams: UpdateUserParams) {
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
    return updatedUser[0];
  }
}
