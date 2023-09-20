import { UpdatesController } from "../controllers/update.controller";
import express from "express";

const router = express.Router();

const updateController = new UpdatesController();

router.get("/updateCMS", (req, res) => {
  updateController.updateCMS(req, res);
});

export const updatesRoutes = router;
