import { PostgresHelper } from "../../../db/postgres/helper.js";
import { UpdateTransactionRepository } from "../../../interfaces/repositories/transaction.js";
import { Transaction, UpdateTransactionParams } from "../../../types/index.js";

export class PostgresUpdateTransactionRepository
  implements UpdateTransactionRepository
{
  async execute(
    transactionId: string,
    updateTransactionParams: UpdateTransactionParams,
  ): Promise<Transaction> {
    const updateFields: string[] = [];
    const updateValues: string[] = [];

    Object.keys(updateTransactionParams).forEach((key) => {
      const typedKey = key as keyof UpdateTransactionParams;
      updateFields.push(`${key} = $${updateValues.length + 1}`);
      updateValues.push(updateTransactionParams[typedKey] as string);
    });
    updateValues.push(transactionId);

    const updateQuery = `
        UPDATE transactions
        SET ${updateFields.join(", ")}
        WHERE id = $${updateValues.length}
        RETURNING *
    `;

    const updatedTransaction = await PostgresHelper.query(
      updateQuery,
      updateValues,
    );
    return updatedTransaction[0] as Transaction;
  }
}
