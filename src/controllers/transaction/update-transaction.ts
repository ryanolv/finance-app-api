import { UpdateTransactionUseCase } from "../../use-cases/index.js";
import {
  checkIfAmountIsValid,
  checkIfIdIsValid,
  checkIfTypeIsValid,
  internalServerError,
  invalidIdResponse,
  invalidTypeResponse,
  ok,
  someFieldIsNotAllowedResponse,
} from "../helpers/index.js";

type HttpRequest = {
  params: {
    transactionId: string;
  };
  body: {
    name?: string;
    amount?: string;
    date?: string;
    type?: string;
  };
};

export class UpdateTransactionController {
  private updateTransactionUseCase: UpdateTransactionUseCase;

  constructor(updateTransactionUseCase: UpdateTransactionUseCase) {
    this.updateTransactionUseCase = updateTransactionUseCase;
  }

  async execute({ params, body }: HttpRequest) {
    try {
      const validId = checkIfIdIsValid(params.transactionId);
      if (!validId) {
        return invalidIdResponse();
      }

      const allowedFields = ["name", "amount", "date", "type"];
      const someFieldIsNotAllowed = Object.keys(body).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldIsNotAllowed) {
        return someFieldIsNotAllowedResponse();
      }

      if (body.amount) {
        const validAmount = checkIfAmountIsValid(body.amount);
        if (!validAmount) {
          return checkIfAmountIsValid(body.amount);
        }
      }

      if (body.type) {
        const validType = checkIfTypeIsValid(body.type);
        if (!validType) {
          return invalidTypeResponse();
        }
      }

      const transaction = await this.updateTransactionUseCase.execute(
        params.transactionId,
        body,
      );

      return ok(transaction);
    } catch (error) {
      console.error(error);
      return internalServerError();
    }
  }
}
