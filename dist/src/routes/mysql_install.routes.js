"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mySQLInstallRoutes = void 0;
const mysql_install_controller_1 = require("../controllers/database/mysql_install.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const mySQLInstallController = new mysql_install_controller_1.MySQLInstallController();
router.post("/finalizeInstall", (req, res) => {
    mySQLInstallController.finalizeInstall(req, res);
});
router.post("/checkAvailability", (req, res) => {
    mySQLInstallController.checkDatabaseAvailability(req, res);
});
exports.mySQLInstallRoutes = router;
