import { ZodError } from "zod";
import { UpdateUserControllerInterface } from "../../interfaces/controllers/user.js";
import { UpdateUserUseCaseInterface } from "../../interfaces/use-cases/user.js";
import { updateUserSchema } from "../../schemas/user.js";
import { HttpResponse, UpdateUserRequest } from "../../types/index.js";
import { badRequest, internalServerError, ok } from "../helpers/index.js";
import { EmailAlreadyExistsError } from "../../errors/user.js";

export class UpdateUserController implements UpdateUserControllerInterface {
  private updateUserUseCase: UpdateUserUseCaseInterface;

  constructor(updateUserUseCase: UpdateUserUseCaseInterface) {
    this.updateUserUseCase = updateUserUseCase;
  }

  async execute(httpRequest: UpdateUserRequest): Promise<HttpResponse> {
    try {
      const { body, params } = httpRequest;
      await updateUserSchema.parseAsync(body);

      const userId = params!.userId;

      const updatedUser = await this.updateUserUseCase.execute(userId, body);
      return ok(updatedUser);
    } catch (error) {
      console.error(error);
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
