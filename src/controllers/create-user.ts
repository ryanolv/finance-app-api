import { CreateUserUseCase } from "../use-cases/create-user.js";
import { badRequest, created, internalServerError } from "./helpers.js";

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
        // TODO: retirar espaços em branco
        const value = params[field as keyof typeof params];

        if (!value || value.trim() === "") {
          return badRequest(`Missing param: ${field}`);
        }
      }

      const emailIsValid = params.email.indexOf("@") === -1;
      if (emailIsValid) {
        return badRequest("Invalid email. Please provide a valid one");
      }

      const passwordIsValid = params.password.length < 6;
      if (passwordIsValid) {
        return badRequest("Password must have at least 6 characters");
      }

      const createUserUseCase = new CreateUserUseCase();
      const createdUser = await createUserUseCase.execute(params);
      return created(createdUser);
    } catch (error) {
      console.log(error);
      return internalServerError();
    }
  }
}
