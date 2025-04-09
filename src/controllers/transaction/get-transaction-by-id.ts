import { GetTransactionByIdRequest } from "../../types/index.js";
import { GetTransactionByIdUseCase } from "../../use-cases/index.js";
import {
  checkIfIdIsValid,
  internalServerError,
  invalidIdResponse,
  notFound,
  ok,
} from "../helpers/index.js";

export class GetTransactionByIdController {
  private getTransactionByIdUseCase: GetTransactionByIdUseCase;

  constructor(getTransactionByIdUseCase: GetTransactionByIdUseCase) {
    this.getTransactionByIdUseCase = getTransactionByIdUseCase;
  }

  async execute(httpRequest: GetTransactionByIdRequest) {
    try {
      const transactionId = httpRequest.params!.transactionId;

      const idIsValid = checkIfIdIsValid(transactionId);
      if (!idIsValid) {
        return invalidIdResponse();
      }

      const transaction =
        await this.getTransactionByIdUseCase.execute(transactionId);

      if (!transaction) {
        return notFound({ message: "Transaction not found." });
      }

      return ok(transaction);
    } catch (error) {
      console.error(error);
      return internalServerError();
    }
  }
}
