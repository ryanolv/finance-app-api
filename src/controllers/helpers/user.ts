import validator from "validator";
import { badRequest } from "./http.js";

export const invalidPasswordResponse = () =>
  badRequest("Password must have at least 6 characters");

export const invalidEmailResponse = () =>
  badRequest("Invalid email. Please provide a valid one");

export const invalidIdResponse = () =>
  badRequest("The provided id is not valid.");

export const checkIfPasswordIsNotValid = (password: string) =>
  password.length < 6;
export const checkIfEmailIsNotValid = (email: string) =>
  validator.isEmail(email) === false;
export const checkIfIdIsValid = (id: string) => validator.isUUID(id);
