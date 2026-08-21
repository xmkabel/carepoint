import { Router } from "express";
import { getAllDoctors, deleteUser } from "../controllers/admin.controller.js";
import { auth, authZ } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/doctors", auth, authZ, getAllDoctors);

router.delete("/delete/:id", auth, authZ, deleteUser);

export default router;