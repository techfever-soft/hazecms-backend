import { PagesController } from "../controllers/pages.controller";
import express from "express";

const router = express.Router();

const updateController = new PagesController();

router.get("/getOne", (req, res) => {
  updateController.getOne(req, res);
});

router.get("/getAll", (req, res) => {
  updateController.getAll(req, res);
});

export const pagesRoutes = router;
