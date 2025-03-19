import validator from "validator";

import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
import { badRequest, internalServerError, notFound, ok } from "./helpers.js";

interface HttpRequest {
  params: {
    userId: string;
  };
}

export class GetUserByIdController {
  async execute(request: HttpRequest) {
    try {
      const isIdValid = validator.isUUID(request.params.userId);
      if (!isIdValid) {
        return badRequest("The provided id is not valid.");
      }

      const getUserByIdUseCase = new GetUserByIdUseCase();
      const user = await getUserByIdUseCase.execute(request.params.userId);

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
