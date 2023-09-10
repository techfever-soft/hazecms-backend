import { AdminController } from "../controllers/admin.controller";
import express from "express";

const router = express.Router();

const adminController = new AdminController();

// Useless for the moment
// router.post("/login", (req, res) => {
//   adminController.login(req, res);
// });

export const adminRoutes = router;
