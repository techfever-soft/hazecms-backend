import { UpdateController } from "../controllers/update.controller";
import express from "express";

const router = express.Router();

const updateController = new UpdateController();

router.get("/update", (req, res) => {
  updateController.checkUpdates(req, res);
});

export const updateRoutes = router;
