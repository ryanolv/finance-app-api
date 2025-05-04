import { DeleteTransactionControllerInterface } from "../../interfaces/controllers/transaction.js";
import { DeleteTransactionUseCaseInterface } from "../../interfaces/use-cases/transaction.js";
import { HttpResponse } from "../../types/http.js";
import { DeleteTransactionRequest } from "../../types/transaction.js";
import {
  checkIfIdIsValid,
  internalServerError,
  invalidIdResponse,
  notFound,
  ok,
} from "../helpers/index.js";

export class DeleteTransactionController
  implements DeleteTransactionControllerInterface
{
  private deleteTransactionUseCase: DeleteTransactionUseCaseInterface;
  constructor(deleteTransactionUseCase: DeleteTransactionUseCaseInterface) {
    this.deleteTransactionUseCase = deleteTransactionUseCase;
  }

  async execute({ params }: DeleteTransactionRequest): Promise<HttpResponse> {
    try {
      const validId = checkIfIdIsValid(params!.transactionId);
      if (!validId) {
        return invalidIdResponse();
      }

      const deletedTransaction = await this.deleteTransactionUseCase.execute(
        params!.transactionId,
      );
      if (!deletedTransaction) {
        return notFound({ message: "Transaction not found" });
      }

      return ok(deletedTransaction);
    } catch (error) {
      console.error(error);
      return internalServerError();
    }
  }
}
