import { PostgresHelper } from "../../../db/postgres/helper.js";
import { GetTransactionByIdRepository } from "../../../interfaces/repositories/transaction.js";
import { Transaction } from "../../../types/transaction.js";

export class PostgresGetTransactionByIdRepository
  implements GetTransactionByIdRepository
{
  async execute(transactionId: string): Promise<Transaction> {
    const transaction = await PostgresHelper.query(
      `SELECT * FROM transactions WHERE id = $1`,
      [transactionId],
    );
    return transaction[0] as Transaction;
  }
}
