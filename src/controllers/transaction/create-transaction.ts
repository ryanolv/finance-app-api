import { badRequest, created, internalServerError } from "../helpers/index.js";
import { CreateTransactionRequest } from "../../types/transaction.js";
import { CreateTransactionUseCaseInterface } from "../../interfaces/use-cases/transaction.js";
import { CreateTransactionControllerInterface } from "../../interfaces/controllers/transaction.js";
import { HttpResponse } from "../../types/http.js";
import { transactionSchema } from "../../schemas/transaction.js";
import { ZodError } from "zod";

export class CreateTransactionController
  implements CreateTransactionControllerInterface
{
  private createTransactionUseCase: CreateTransactionUseCaseInterface;

  constructor(createTransactionUseCase: CreateTransactionUseCaseInterface) {
    this.createTransactionUseCase = createTransactionUseCase;
  }

  async execute(httpRequest: CreateTransactionRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      await transactionSchema.parseAsync(body);

      const transaction = await this.createTransactionUseCase.execute(body);

      return created(transaction);
    } catch (error) {
      console.error(error);
      if (error instanceof ZodError) {
        return badRequest(error.errors[0].message);
      }
      return internalServerError();
    }
  }
}
