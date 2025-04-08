export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("The provided e-mail is already in use.");
    this.name = "EmailAlreadyExistsError";
  }
}

export class UserNotFoundError extends Error {
  constructor(userId: string) {
    super(`User with id ${userId} not found.`);
    this.name = "UserNotFoundError";
  }
}
