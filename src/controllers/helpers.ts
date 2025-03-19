export const badRequest = (message: string) => ({
  statusCode: 400,
  body: {
    message,
  },
});

export const created = (createdUser: object) => ({
  statusCode: 201,
  body: createdUser,
});

export const internalServerError = () => ({
  statusCode: 500,
  body: {
    errorMessage: "Internal server error",
  },
});

export const ok = (body: object) => ({
  statusCode: 200,
  body,
});

export const notFound = (body: object) => ({
  statusCode: 404,
  body,
});
