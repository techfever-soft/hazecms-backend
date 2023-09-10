import { MySQLInstallController } from "../../controllers/database/mysql_install.controller";
import express from "express";

const router = express.Router();

const mySQLInstallController = new MySQLInstallController();

router.post("/finalizeInstall", (req, res) => {
  mySQLInstallController.finalizeInstall(req, res);
});

router.post("/checkAvailability", (req, res) => {
  mySQLInstallController.checkDatabaseAvailability(req, res);
});

export const mySQLInstallRoutes = router;
