import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import { swaggerDocs } from "./config/swagger";

// Uncomment each line as that module gets built:
// import { errorHandler } from "./middlewares/errorHandler.middleware";
import authRoutes from "./routes/auth.routes";
import doctorRoutes from "./routes/doctor.routes";
import adminRoutes from "./routes/admin.routes";
import appointmentRoutes from "./routes/appointment.routes";

const app = express();

// Global middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Carepoint API is running" });
});


// API routes - uncomment as each is built
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/appointments", appointmentRoutes);

swaggerDocs(app);
// 404 handler - catches any route not matched above
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});


// Global error handler - must be last
// app.use(errorHandler);

export default app;