import { PostgresHelper } from "../../../db/postgres/helper.js";
import { CreateTransactionRepository } from "../../../interfaces/repositories/transaction.js";
import { CreateTransactionParams, Transaction } from "../../../types/index.js";

export class PostgresCreateTransactionRepository
  implements CreateTransactionRepository
{
  async execute(
    createTransactionParams: CreateTransactionParams,
  ): Promise<Transaction> {
    const createdTransaction = await PostgresHelper.query(
      `
      INSERT INTO transactions (id, user_id, name, date, amount, type) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *;
      `,
      [
        createTransactionParams.id,
        createTransactionParams.user_id,
        createTransactionParams.name,
        createTransactionParams.date,
        createTransactionParams.amount,
        createTransactionParams.type,
      ],
    );
    return createdTransaction[0] as Transaction;
  }
}
