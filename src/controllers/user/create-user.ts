import { ZodError } from "zod";
import { EmailAlreadyExistsError } from "../../errors/user.js";
import { CreateUserControllerInterface } from "../../interfaces/controllers/user.js";
import { CreateUserUseCaseInterface } from "../../interfaces/use-cases/user.js";
import { CreateUserRequest, HttpResponse } from "../../types/index.js";
import { badRequest, created, internalServerError } from "../helpers/index.js";
import { createUserSchema } from "../../schemas/user.js";

export class CreateUserController implements CreateUserControllerInterface {
  private createUserUseCase: CreateUserUseCaseInterface;

  constructor(createUserUseCase: CreateUserUseCaseInterface) {
    this.createUserUseCase = createUserUseCase;
  }

  async execute(httpRequest: CreateUserRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest;

      await createUserSchema.parseAsync(body);

      const createdUser = await this.createUserUseCase.execute(body);
      return created(createdUser);
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest(error.errors[0].message);
      }
      if (error instanceof EmailAlreadyExistsError) {
        return badRequest(error.message);
      }
      return internalServerError();
    }
  }
}
