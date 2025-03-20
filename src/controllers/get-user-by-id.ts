import { GetUserByIdUseCase } from "../use-cases/index.js";
import {
  checkIfIdIsValid,
  invalidIdResponse,
  internalServerError,
  notFound,
  ok,
} from "./helpers/index.js";

interface HttpRequest {
  params: {
    userId: string;
  };
}

export class GetUserByIdController {
  private getUserByIdUseCase: GetUserByIdUseCase;

  constructor(getUserByIdUseCase: GetUserByIdUseCase) {
    this.getUserByIdUseCase = getUserByIdUseCase;
  }
  async execute(request: HttpRequest) {
    try {
      const isIdValid = checkIfIdIsValid(request.params.userId);
      if (!isIdValid) {
        return invalidIdResponse();
      }

      const user = await this.getUserByIdUseCase.execute(request.params.userId);

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
