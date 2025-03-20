import { GetUserByIdUseCase } from "../use-cases/get-user-by-id.js";
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
  async execute(request: HttpRequest) {
    try {
      const isIdValid = checkIfIdIsValid(request.params.userId);
      if (!isIdValid) {
        return invalidIdResponse();
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
