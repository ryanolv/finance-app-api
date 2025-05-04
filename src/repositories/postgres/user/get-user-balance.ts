import { PostgresHelper } from "../../../db/postgres/helper.js";
import { GetUserBalanceRepository } from "../../../interfaces/repositories/user.js";
import { BalanceOfUser } from "../../../types/user.js";

export class PostgresGetUserBalanceRepository
  implements GetUserBalanceRepository
{
  async execute(userId: string): Promise<BalanceOfUser> {
    const balance = await PostgresHelper.query(
      `
            SELECT
                SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) AS earnings,
                SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS expenses,
                SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) AS investments,
                (
                    SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END)
                    - SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END)
                    - SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END)
                ) AS balance
            FROM transactions
            WHERE user_id = $1
        `,
      [userId],
    );

    return {
      userId,
      ...balance[0],
    } as BalanceOfUser;
  }
}
