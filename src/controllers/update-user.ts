import validator from "validator";

import { badRequest, internalServerError, ok } from "./helpers.js";
import { UpdateUserUseCase } from "../use-cases/update-user.js";

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
      const updateUserParams = httpRequest.body;
      const userId = httpRequest.params.userId;
      const isIdValid = validator.isUUID(userId);

      if (!isIdValid) {
        return badRequest("The provided id is not valid.");
      }

      const allowedFields = ["first_name", "last_name", "email", "password"];
      const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
        (field) => !allowedFields.includes(field),
      );

      if (someFieldIsNotAllowed) {
        return badRequest("Some provided field is not allowed.");
      }

      if (updateUserParams.password) {
        const passwordIsNotValid = updateUserParams.password.length < 6;

        if (passwordIsNotValid) {
          return badRequest("Password must have at least 6 characters");
        }
      }

      if (updateUserParams.email) {
        const emailIsNotValid = updateUserParams.email.indexOf("@") === -1;

        if (emailIsNotValid) {
          return badRequest("Invalid email. Please provide a valid one");
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
