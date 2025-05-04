import { PostgresHelper } from "../../../db/postgres/helper.js";
import { DeleteTransactionRepository } from "../../../interfaces/repositories/transaction.js";
import { Transaction } from "../../../types/transaction.js";

export class PostgresDeleteTransactionRepository
  implements DeleteTransactionRepository
{
  async execute(transactionId: string): Promise<Transaction> {
    const deletedUser = await PostgresHelper.query(
      `
        DELETE FROM transactions
        WHERE id = $1
        RETURNING *
    `,
      [transactionId],
    );
    return deletedUser[0] as Transaction;
  }
}
