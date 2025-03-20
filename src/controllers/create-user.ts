import { EmailAlreadyExistsError } from "../errors/user.js";
import { CreateUserUseCase } from "../use-cases/index.js";
import {
  checkIfEmailIsNotValid,
  checkIfPasswordIsNotValid,
  invalidEmailResponse,
  invalidPasswordResponse,
  badRequest,
  created,
  internalServerError,
} from "./helpers/index.js";

export interface HttpRequest {
  body: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };
}

export class CreateUserController {
  async execute(httpRequest: HttpRequest) {
    try {
      const params = httpRequest.body;
      const requiredFields = ["first_name", "last_name", "email", "password"];

      if (!params) {
        return badRequest("Missing request body");
      }

      for (const field of requiredFields) {
        const value = params[field as keyof typeof params];

        if (!value || value.trim() === "") {
          return badRequest(`Missing param: ${field}`);
        }
      }

      const emailIsNotValid = checkIfEmailIsNotValid(params.email);
      if (emailIsNotValid) {
        return invalidEmailResponse();
      }

      const passwordIsNotValid = checkIfPasswordIsNotValid(params.password);
      if (passwordIsNotValid) {
        return invalidPasswordResponse();
      }

      const createUserUseCase = new CreateUserUseCase();
      const createdUser = await createUserUseCase.execute(params);
      return created(createdUser);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        return badRequest(error.message);
      }
      return internalServerError();
    }
  }
}
