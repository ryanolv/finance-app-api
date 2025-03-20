import { DeleteUserUseCase } from "../use-cases/index.js";
import {
  checkIfIdIsValid,
  internalServerError,
  invalidIdResponse,
  ok,
} from "./helpers/index.js";

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

export class DeleteUserController {
  async execute(httpRequest: HttpRequest) {
    try {
      const userId = httpRequest.params.userId;
      const idIsValid = checkIfIdIsValid(userId);
      if (!idIsValid) {
        return invalidIdResponse();
      }

      const deleteUserUseCase = new DeleteUserUseCase();
      const deletedUser = await deleteUserUseCase.execute(userId);
      return ok(deletedUser);
    } catch (error) {
      console.error(error);
      return internalServerError();
    }
  }
}
