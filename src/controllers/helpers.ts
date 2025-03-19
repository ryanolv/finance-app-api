export const badRequest = (message: string) => {
  return {
    statusCode: 400,
    body: {
      message,
    },
  };
};

export const created = (createdUser: object) => {
  return {
    statusCode: 201,

    body: createdUser,
  };
};

export const internalServerError = () => {
  return {
    statusCode: 500,
    body: {
      errorMessage: "Internal server error",
    },
  };
};
