import {
  checkIfIdIsValid,
  created,
  internalServerError,
  invalidIdResponse,
  requiredFieldIsMissingResponse,
  validateRequiredFields,
  checkIfAmountIsValid,
  checkIfTypeIsValid,
  invalidTypeResponse,
  invalidAmountResponse,
} from "../helpers/index.js";
import { CreateTransactionRequest } from "../../types/transaction.js";
import { CreateTransactionUseCaseInterface } from "../../interfaces/use-cases/transaction.js";

export class CreateTransactionController {
  private createTransactionUseCase: CreateTransactionUseCaseInterface;

  constructor(createTransactionUseCase: CreateTransactionUseCaseInterface) {
    this.createTransactionUseCase = createTransactionUseCase;
  }

  async execute(httpRequest: CreateTransactionRequest) {
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

      const amountIsValid = checkIfAmountIsValid(params.amount);
      if (!amountIsValid) {
        return invalidAmountResponse();
      }

      const type = params.type.trim().toUpperCase();
      const typeIsValid = checkIfTypeIsValid(type);

      if (!typeIsValid) {
        return invalidTypeResponse();
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
