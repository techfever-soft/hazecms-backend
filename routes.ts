import express from "express";
import { mySQLInstallRoutes } from "./src/routes/mysql_install.routes";
import { mySQLRoutes } from "./src/routes/mysql.routes";

const router = express.Router();

router.use("/api/v1/install/mysql/", mySQLInstallRoutes);
// router.use("/api/v1/mysql/", mySQLRoutes);

export const routes = router;
