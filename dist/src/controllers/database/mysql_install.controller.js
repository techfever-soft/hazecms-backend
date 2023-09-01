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
exports.MySQLInstallController = void 0;
const mysql = __importStar(require("mysql"));
const mysql_install_service_1 = require("../../services/mysql_install.service");
class MySQLInstallController {
    constructor() { }
    checkDatabaseAvailability(req, res) {
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
    }
    finalizeInstall(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAppInstance = {
                activation: {
                    apiKey: req.body.activation.apiKey,
                },
                database: {
                    databaseType: req.body.database.databaseType,
                    host: req.body.database.host,
                    username: req.body.database.username,
                    password: req.body.database.password,
                    database: req.body.database.database
                        ? req.body.database.database
                        : "hazecms",
                    port: req.body.database.port,
                },
                config: {
                    adminsList: req.body.config.adminsList,
                },
            };
            // console.log(newAppInstance);
            const mySQLInstallService = new mysql_install_service_1.MySQLInstallService(newAppInstance.database.host, newAppInstance.database.username, newAppInstance.database.password, newAppInstance.database.port);
            const databaseName = newAppInstance.database.database;
            /**
             * ANCHOR Step one: Create app instance
             */
            // axios
            //   .post(baseAPIUrl + "app/createAppInstance", newAppInstance)
            //   .then(() => {
            //     console.log("created app instance");
            //   });
            try {
                /**
                 * ANCHOR Step two: Create database & tables
                 */
                yield mySQLInstallService.createDatabase(databaseName);
                yield mySQLInstallService.createAdminTable();
                const adminsList = newAppInstance.config
                    .adminsList;
                yield mySQLInstallService.insertAdmins(adminsList);
                yield mySQLInstallService.createPagesTable();
                yield mySQLInstallService.insertExamplePages();
                yield mySQLInstallService.createPostsTable();
                yield mySQLInstallService.createPostsCategoriesTable();
                yield mySQLInstallService.insertExampleCategories();
                yield mySQLInstallService.insertExamplePosts();
                /**
                 * TODO: other operations
                 */
                /**
                 * ANCHOR Step three: Set new config
                 */
                yield mySQLInstallService.createConfigTable();
                const newConfig = {};
                // await mySQLService.updateConfigTable();
                /**
                 * ANCHOR Step four: Return the status
                 */
                res.status(200).send({
                    type: "success",
                    message: "App installed successfully",
                });
            }
            catch (e) {
                console.log(e);
                res.status(500).send({
                    type: "error",
                    message: "Can't install the app",
                });
            }
        });
    }
}
exports.MySQLInstallController = MySQLInstallController;
