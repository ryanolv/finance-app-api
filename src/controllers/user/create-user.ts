import { EmailAlreadyExistsError } from "../../errors/user.js";
import { CreateUserControllerInterface } from "../../interfaces/controllers/user.js";
import { CreateUserUseCaseInterface } from "../../interfaces/use-cases/user.js";
import { CreateUserRequest, HttpResponse } from "../../types/index.js";
import {
  checkIfEmailIsNotValid,
  checkIfPasswordIsNotValid,
  invalidEmailResponse,
  invalidPasswordResponse,
  badRequest,
  created,
  internalServerError,
  validateRequiredFields,
  requiredFieldIsMissingResponse,
} from "../helpers/index.js";

export class CreateUserController implements CreateUserControllerInterface {
  private createUserUseCase: CreateUserUseCaseInterface;

  constructor(createUserUseCase: CreateUserUseCaseInterface) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(httpRequest: CreateUserRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.body;
      const requiredFields = ["first_name", "last_name", "email", "password"];

      if (!params) {
        return badRequest("Missing request body");
      }

      const { ok: requiredFieldsAreFilled, missingField } =
        validateRequiredFields(params, requiredFields);

      if (!requiredFieldsAreFilled) {
        return requiredFieldIsMissingResponse(missingField as string);
      }

      const emailIsNotValid = checkIfEmailIsNotValid(params.email);
      if (emailIsNotValid) {
        return invalidEmailResponse();
      }

      const passwordIsNotValid = checkIfPasswordIsNotValid(params.password);
      if (passwordIsNotValid) {
        return invalidPasswordResponse();
      }

      const createdUser = await this.createUserUseCase.execute(params);
      return created(createdUser);
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        return badRequest(error.message);
      }
      return internalServerError();
    }
  }
}
