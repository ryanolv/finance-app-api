import { PostgresHelper } from "../../../db/postgres/helper.js";

type UpdateTransactionParams = {
  name?: string;
  date?: string;
  amount?: string;
  type?: string;
};

export class PostgresUpdateTransactionRepository {
  async execute(
    transactionId: string,
    updateTransactionParams: UpdateTransactionParams,
  ) {
    const updateFields: string[] = [];
    const updateValues: string[] = [];

    Object.keys(updateTransactionParams).forEach((key) => {
      const typedKey = key as keyof UpdateTransactionParams;
      updateFields.push(`${key} = $${updateValues.length + 1}`);
      updateFields.push(updateTransactionParams[typedKey] as string);
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
    return updatedTransaction[0];
  }
}
