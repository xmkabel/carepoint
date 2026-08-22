import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Clinic Booking System API",
            version: "1.0.0",
            description: "API documentation for the Clinic Booking System backend",
        },
        servers: [
            {
                url: "https://carepoint-production-eff1.up.railway.app",
                description: "Production Server (Railway)",
            },
            {
                url: "http://localhost:3000",
                description: "Local server",
            },
        ],
    },
    apis: ["./src/routes/*.ts"], 
};

const specs = swaggerJsdoc(options);

export const swaggerDocs = (app: Express) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
};