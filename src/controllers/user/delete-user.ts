import { DeleteUserUseCaseInterface } from "../../interfaces/use-cases/user.js";
import { DeleteUserRequest } from "../../types/index.js";
import {
  checkIfIdIsValid,
  internalServerError,
  invalidIdResponse,
  notFound,
  ok,
} from "../helpers/index.js";

export class DeleteUserController {
  private deleteUserUseCase: DeleteUserUseCaseInterface;

  constructor(deleteUserUseCase: DeleteUserUseCaseInterface) {
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
