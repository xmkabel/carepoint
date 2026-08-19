import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";

// Uncomment each line as that module gets built:
// import { errorHandler } from "./middlewares/errorHandler.middleware";
// import authRoutes from "./routes/auth.routes";
// import doctorRoutes from "./routes/doctor.routes";
// import scheduleRoutes from "./routes/schedule.routes";
// import appointmentRoutes from "./routes/appointment.routes";

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Carepoint API is running" });
});

// Swagger docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// API routes - uncomment as each is built
// app.use("/api/auth", authRoutes);
// app.use("/api/doctors", doctorRoutes);
// app.use("/api/schedules", scheduleRoutes);
// app.use("/api/appointments", appointmentRoutes);

// 404 handler - catches any route not matched above
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Global error handler - must be last
// app.use(errorHandler);

export default app;