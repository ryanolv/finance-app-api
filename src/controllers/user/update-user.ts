import { UpdateUserUseCase } from "../../use-cases/index.js";
import {
  checkIfEmailIsNotValid,
  checkIfIdIsValid,
  checkIfPasswordIsNotValid,
  invalidEmailResponse,
  invalidIdResponse,
  invalidPasswordResponse,
  badRequest,
  internalServerError,
  ok,
} from "../helpers/index.js";

interface HttpRequest {
  params: {
    userId: string;
  };
  body: {
    first_name?: string;
    last_name?: string;
    email?: string;
    password?: string;
  };
}

export class UpdateUserController {
  private updateUserUseCase: UpdateUserUseCase;

  constructor(updateUserUseCase: UpdateUserUseCase) {
    this.updateUserUseCase = updateUserUseCase;
  }

  async execute(httpRequest: HttpRequest) {
    try {
      const params = httpRequest.body;
      const userId = httpRequest.params.userId;
      const isIdValid = checkIfIdIsValid(userId);

      if (!isIdValid) {
        return invalidIdResponse();
      }

      const allowedFields = ["first_name", "last_name", "email", "password"];
      const someFieldIsNotAllowed = Object.keys(params).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldIsNotAllowed) {
        return badRequest("Some provided field is not allowed.");
      }

      if (params.password) {
        const passwordIsNotValid = checkIfPasswordIsNotValid(params.password);

        if (passwordIsNotValid) {
          return invalidPasswordResponse();
        }
      }

      if (params.email) {
        const emailIsNotValid = checkIfEmailIsNotValid(params.email);

        if (emailIsNotValid) {
          return invalidEmailResponse();
        }
      }

      const updatedUser = await this.updateUserUseCase.execute(
        userId,
        httpRequest.body,
      );
      return ok(updatedUser);
    } catch (error) {
      console.error(error);
      return internalServerError();
    }
  }
}
