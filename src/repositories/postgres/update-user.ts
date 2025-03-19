import { PostgresHelper } from "../../db/postgres/helper";

export class PostgresUpdateUserRepository {
  async execute(userId: string, updatedUserParams: Record<string, string>) {
    const updateFields: string[] = [];
    const updateValues: string[] = [];

    Object.keys(updatedUserParams).forEach((key) => {
      updateFields.push(`${key} = $${updateValues.length + 1}`);
      updateValues.push(updatedUserParams[key]);
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
