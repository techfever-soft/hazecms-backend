import * as mysql from "./shared/database/mysql";

import express from "express";

const router = express.Router();

/**
 * ANCHOR Install
 */

router.post("/api/v1/database/mysql/finalizeInstall", (req, res) => {
  mysql.finalizeInstall(req, res);
});

router.post("/api/v1/database/mysql/checkDatabaseAvailability", (req, res) => {
  mysql.checkDatabaseAvailability(req, res);
});

export const routes = router;
