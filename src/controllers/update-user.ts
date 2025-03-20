import { UpdateUserUseCase } from "../use-cases/update-user.js";
import { badRequest, internalServerError, ok } from "./helpers/http.js";
import {
  checkIfEmailIsNotValid,
  checkIfIdIsValid,
  checkIfPasswordIsNotValid,
  invalidEmailResponse,
  invalidIdResponse,
  invalidPasswordResponse,
} from "./helpers/user.js";

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

      const updateUserUseCase = new UpdateUserUseCase();
      const updatedUser = await updateUserUseCase.execute(
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
