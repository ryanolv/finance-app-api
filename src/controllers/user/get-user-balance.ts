import { GetUserBalanceControllerInterface } from "../../interfaces/controllers/user";
import { GetUserBalanceUseCaseInterface } from "../../interfaces/use-cases/user";
import { GetUserBalanceRequest } from "../../types";
import {
  checkIfIdIsValid,
  internalServerError,
  invalidIdResponse,
  ok,
} from "../helpers/index.js";

export class GetUserBalanceController
  implements GetUserBalanceControllerInterface
{
  constructor(
    private readonly getUserBalanceUseCase: GetUserBalanceUseCaseInterface,
  ) {}

  async execute(httpRequest: GetUserBalanceRequest) {
    try {
      const userId = httpRequest.params!.userId;

      const userIdIsValid = checkIfIdIsValid(userId);
      if (!userIdIsValid) {
        return invalidIdResponse();
      }

      const balance = await this.getUserBalanceUseCase.execute(userId);
      return ok(balance);
    } catch (error) {
      console.error(error);
      return internalServerError();
    }
  }
}
