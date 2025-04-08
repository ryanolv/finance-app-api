import validator from "validator";

import {
  badRequest,
  checkIfIdIsValid,
  created,
  internalServerError,
  invalidIdResponse,
  requiredFieldIsMissingResponse,
  validateRequiredFields,
} from "../helpers/index.js";
import { CreateTransactionUseCase } from "../../use-cases/transaction/create-transaction.js";

type HttpRequest = {
  body: {
    user_id: string;
    name: string;
    amount: string;
    type: string;
    date: string;
  };
};

export class CreateTransactionController {
  private createTransactionUseCase: CreateTransactionUseCase;

  constructor(createTransactionUseCase: CreateTransactionUseCase) {
    this.createTransactionUseCase = createTransactionUseCase;
  }

  async execute(httpRequest: HttpRequest) {
    try {
      const params = httpRequest.body;

      const requiredFields = ["user_id", "name", "amount", "type", "date"];

      const { ok: requiredFieldsAreFilled, missingField } =
        validateRequiredFields(params, requiredFields);

      if (!requiredFieldsAreFilled) {
        return requiredFieldIsMissingResponse(missingField as string);
      }

      const userIdIsValid = checkIfIdIsValid(params.user_id);
      if (!userIdIsValid) {
        return invalidIdResponse();
      }

      const amountIsValid = validator.isCurrency(params.amount, {
        allow_negatives: false,
        digits_after_decimal: [0, 2],
        decimal_separator: ".",
      });
      if (!amountIsValid) {
        return badRequest("The amount must be a valid currency");
      }

      const type = params.type.trim().toUpperCase();
      const typeIsValid = ["EARNING", "EXPENSE", "INVESTMENT"].includes(type);

      if (!typeIsValid) {
        return badRequest("The type must be EARNING, EXPENSE or INVESTMENT");
      }

      const transaction = await this.createTransactionUseCase.execute({
        user_id: params.user_id,
        name: params.name,
        amount: params.amount,
        type: type,
        date: params.date,
      });

      return created(transaction);
    } catch (error) {
      console.error(error);
      return internalServerError();
    }
  }
}
