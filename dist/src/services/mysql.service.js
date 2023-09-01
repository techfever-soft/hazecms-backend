"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLService = void 0;
const database_middleware_1 = require("../middlewares/database.middleware");
class MySQLService {
    constructor(host, user, password, port) {
        const mySQLConnectionMiddleware = new database_middleware_1.MySQLConnectionMiddleware(host, user, password, port);
        this.connection = mySQLConnectionMiddleware.getConnection();
    }
}
exports.MySQLService = MySQLService;
