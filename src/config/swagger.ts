import swaggerJSDoc from "swagger-jsdoc";

export const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Carepoint API",
      version: "1.0.0",
      description: "API for booking and managing medical appointments between patients, doctors, and admins.",
    },
  },

  apis: ["./src/routes/*.ts"],
};

export const specs = swaggerJSDoc(swaggerOptions);