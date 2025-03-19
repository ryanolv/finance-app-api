export class EmailAlreadyExistsError extends Error {
  constructor() {
    super("The provided e-mail is already in use.");
    this.name = "EmailAlreadyExistsError";
  }
}
