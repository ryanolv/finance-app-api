import { UpdateUserUseCaseInterface } from "../../interfaces/use-cases/user.js";
import { UpdateUserRequest } from "../../types/index.js";
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

export class UpdateUserController {
  private updateUserUseCase: UpdateUserUseCaseInterface;

  constructor(updateUserUseCase: UpdateUserUseCaseInterface) {
    this.updateUserUseCase = updateUserUseCase;
  }

  async execute(httpRequest: UpdateUserRequest) {
    try {
      const params = httpRequest.body;
      const userId = httpRequest.params!.userId;
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
