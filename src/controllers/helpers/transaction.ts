import validator from "validator";
import { badRequest } from "./http.js";

export const checkIfAmountIsValid = (amount: string) => {
  return validator.isCurrency(amount, {
    allow_negatives: false,
    digits_after_decimal: [0, 2],
    decimal_separator: ".",
  });
};

export const checkIfTypeIsValid = (type: string) => {
  return ["EARNING", "EXPENSE", "INVESTMENT"].includes(type);
};

export const invalidTypeResponse = () =>
  badRequest("The type must be EARNING, EXPENSE or INVESTMENT");

export const invalidAmountResponse = () =>
  badRequest("The amount must be a valid currency");
