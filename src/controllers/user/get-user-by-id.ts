import { GetUserByIdControllerInterface } from "../../interfaces/controllers/user.js";
import { GetUserByIdUseCaseInterface } from "../../interfaces/use-cases/user.js";
import { GetUserByIdRequest, HttpResponse } from "../../types/index.js";
import {
  checkIfIdIsValid,
  invalidIdResponse,
  internalServerError,
  notFound,
  ok,
} from "../helpers/index.js";

export class GetUserByIdController implements GetUserByIdControllerInterface {
  private getUserByIdUseCase: GetUserByIdUseCaseInterface;

  constructor(getUserByIdUseCase: GetUserByIdUseCaseInterface) {
    this.getUserByIdUseCase = getUserByIdUseCase;
  }
  async execute(request: GetUserByIdRequest): Promise<HttpResponse> {
    try {
      const isIdValid = checkIfIdIsValid(request.params!.userId);
      if (!isIdValid) {
        return invalidIdResponse();
      }

      const user = await this.getUserByIdUseCase.execute(
        request.params!.userId,
      );

      if (!user) {
        return notFound({ message: "User not found." });
      }

      return ok(user);
    } catch (error) {
      console.error(error);
      return internalServerError();
    }
  }
}
