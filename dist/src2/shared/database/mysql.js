"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finalizeInstall = exports.checkDatabaseAvailability = void 0;
const mysql = __importStar(require("mysql"));
const app_class_1 = require("../../core/classes/app.class");
/**
 * ANCHOR: Public methods
 */
const checkDatabaseAvailability = (req, res) => {
    const connection = mysql.createConnection({
        host: req.body.host,
        user: req.body.username,
        password: req.body.password,
        database: req.body.database,
        port: req.body.port,
    });
    connection.connect((err) => {
        if (err) {
            res.status(500).send({
                type: "error",
                message: "Error to access to database",
                code: err.code,
            });
            return;
        }
        res.status(200).send({
            type: "success",
            message: "Connected successfuly to database",
        });
    });
};
exports.checkDatabaseAvailability = checkDatabaseAvailability;
function finalizeInstall(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // NOTE Step 1: Create app instance
        const appInstance = yield new app_class_1.App().createAppInstance(req.body);
        console.log(appInstance);
        // NOTE Step 2: Create database
    });
}
exports.finalizeInstall = finalizeInstall;
