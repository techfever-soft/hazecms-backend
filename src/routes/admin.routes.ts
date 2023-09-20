import { AdminController } from "../controllers/admin.controller";
import express from "express";

const router = express.Router();

const adminController = new AdminController();



export const adminRoutes = router;
