import { UseCase } from "../../interfaces/use-cases/user.js";
import { DeleteUserRequest, User } from "../../types/index.js";
import {
  checkIfIdIsValid,
  internalServerError,
  invalidIdResponse,
  notFound,
  ok,
} from "../helpers/index.js";

export class DeleteUserController {
  private deleteUserUseCase: UseCase<string, User>;

  constructor(deleteUserUseCase: UseCase<string, User>) {
    this.deleteUserUseCase = deleteUserUseCase;
  }

  async execute(httpRequest: DeleteUserRequest) {
    try {
      const userId = httpRequest.params!.userId;
      const idIsValid = checkIfIdIsValid(userId);
      if (!idIsValid) {
        return invalidIdResponse();
      }

      const deletedUser = await this.deleteUserUseCase.execute(userId);

      if (!deletedUser) {
        return notFound({ message: "User not found" });
      }

      return ok(deletedUser);
    } catch (error) {
      console.error(error);
      return internalServerError();
    }
  }
}
