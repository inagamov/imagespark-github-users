export const ROUTE_PATHS = {
  INDEX: {
    PATH: "/",
  },
  USERS: {
    INDEX: {
      PATH: "/users",
    },
    USER: {
      PATH: "/users/:username",
      PARAMETERS: {
        USERNAME: ":username",
      },
    },
  },
  NOT_FOUND: {
    PATH: "/:catchAll(.*)*",
  },
};
