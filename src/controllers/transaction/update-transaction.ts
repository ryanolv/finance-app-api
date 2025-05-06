import { UpdateTransactionControllerInterface } from "../../interfaces/controllers/transaction.js";
import { UpdateTransactionUseCaseInterface } from "../../interfaces/use-cases/transaction.js";
import { HttpResponse } from "../../types/http.js";
import { UpdateTransactionRequest } from "../../types/transaction.js";
import { transactionUpdateSchema } from "../../schemas/transaction.js";
import {
  badRequest,
  checkIfIdIsValid,
  internalServerError,
  invalidIdResponse,
  ok,
} from "../helpers/index.js";
import { ZodError } from "zod";

export class UpdateTransactionController
  implements UpdateTransactionControllerInterface
{
  private updateTransactionUseCase: UpdateTransactionUseCaseInterface;

  constructor(updateTransactionUseCase: UpdateTransactionUseCaseInterface) {
    this.updateTransactionUseCase = updateTransactionUseCase;
  }

  async execute({
    params,
    body,
  }: UpdateTransactionRequest): Promise<HttpResponse> {
    try {
      const validId = checkIfIdIsValid(params!.transactionId);
      if (!validId) {
        return invalidIdResponse();
      }

      await transactionUpdateSchema.parseAsync(body);

      const transaction = await this.updateTransactionUseCase.execute(
        params!.transactionId,
        body,
      );

      return ok(transaction);
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        return badRequest(error.errors[0].message);
      }
      return internalServerError();
    }
  }
}
