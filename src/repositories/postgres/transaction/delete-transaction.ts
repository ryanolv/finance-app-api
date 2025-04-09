import { PostgresHelper } from "../../../db/postgres/helper.js";

export class PostgresDeleteTransactionRepository {
  async execute(transactionId: string) {
    const deletedUser = await PostgresHelper.query(
      `
        DELETE FROM transactions
        WHERE id = $1
        RETURNING *
    `,
      [transactionId],
    );
    return deletedUser[0];
  }
}
