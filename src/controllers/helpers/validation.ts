import validator from "validator";

import { badRequest } from "./http.js";

export const checkIfIdIsValid = (id: string) => validator.isUUID(id);

export const invalidIdResponse = () =>
  badRequest("The provided id is not valid.");

export const checkIfIsString = (value: unknown) => typeof value === "string";

export const validateRequiredFields = (
  params: object,
  requiredFields: string[],
) => {
  for (const field of requiredFields) {
    const value = params[field as keyof typeof params];
    const fieldIsMissing = !value;
    const fieldIsEmpty =
      checkIfIsString(value) && (value as string).trim() === "";

    if (fieldIsMissing || fieldIsEmpty) {
      return {
        missingField: field,
        ok: false,
      };
    }
  }

  return {
    ok: true,
    missingField: null,
  };
};
