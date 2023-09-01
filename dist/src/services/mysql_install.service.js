"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLInstallService = void 0;
const database_middleware_1 = require("../middlewares/database.middleware");
const crypto_1 = __importDefault(require("crypto"));
function hashAdminPassword(password) {
    const salt = crypto_1.default.randomBytes(32).toString("hex");
    const hashedPassword = crypto_1.default
        .pbkdf2Sync(password, salt, 10000, 128, "sha512")
        .toString("hex");
    return {
        salt,
        hashedPassword,
    };
}
class MySQLInstallService {
    constructor(host, user, password, port) {
        const mySQLConnectionMiddleware = new database_middleware_1.MySQLConnectionMiddleware(host, user, password, port);
        this.connection = mySQLConnectionMiddleware.getConnection();
    }
    /**
     * ANCHOR: CREATE OPERATIONS
     */
    createDatabase(databaseName) {
        return new Promise((resolve, reject) => {
            const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
            this.connection.query(createDatabaseQuery, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
            const useDatabaseQuery = `USE ${databaseName}`;
            this.connection.query(useDatabaseQuery, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
            console.log("[CREATE] Creating database « " + databaseName + " »");
            console.log("[INFO] Using database « " + databaseName + " »");
        });
    }
    createAdminTable() {
        return new Promise((resolve, reject) => {
            const createAdminTableQuery = `
          CREATE TABLE IF NOT EXISTS haze__administrators (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            passwordHash TEXT NOT NULL,
            passwordSalt TEXT NOT NULL
          )`;
            this.connection.query(createAdminTableQuery, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
            console.log("[CREATE] Creating table « haze__administrators »");
        });
    }
    createPagesTable() {
        return new Promise((resolve, reject) => {
            const createPageTableQuery = `
          CREATE TABLE IF NOT EXISTS haze__pages (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              disabled BOOLEAN NOT NULL,
              url VARCHAR(255) NOT NULL,
              description TEXT NOT NULL,
              seoPageTitle VARCHAR(255) NOT NULL,
              seoPageDescription VARCHAR(255) NOT NULL,
              seoReferDisabled BOOLEAN NOT NULL
          )`;
            this.connection.query(createPageTableQuery, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
            console.log("[CREATE] Creating table « haze__pages »");
        });
    }
    createPostsTable() {
        return new Promise((resolve, reject) => {
            const createPostsTableQuery = `
          CREATE TABLE IF NOT EXISTS haze__posts (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              slug VARCHAR(255) NOT NULL,
              categoryId INT NOT NULL,
              content TEXT NOT NULL
          )`;
            this.connection.query(createPostsTableQuery, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
            console.log("[CREATE] Creating table « haze__posts »");
        });
    }
    createPostsCategoriesTable() {
        return new Promise((resolve, reject) => {
            const createPostCategoriesTable = `
          CREATE TABLE IF NOT EXISTS haze__posts_categories (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL
          )`;
            this.connection.query(createPostCategoriesTable, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
            console.log("[CREATE] Creating table « haze__posts_categories »");
        });
    }
    /**
     * TODO: Other operations
     */
    createConfigTable() {
        return new Promise((resolve, reject) => {
            const updateConfigTableQuery = `
        CREATE TABLE IF NOT EXISTS haze__config (
          id INT AUTO_INCREMENT PRIMARY KEY,
          keyName VARCHAR(255) NOT NULL,
          value JSON,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;
            this.connection.query(updateConfigTableQuery, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
            console.log("[CREATE] Creating table « haze__config »");
        });
    }
    /**
     * ANCHOR: READ OPERATIONS
     */
    /**
     * TODO: Other operations
     */
    /**
     * ANCHOR: UPDATE OPERATIONS
     */
    insertAdmins(admins) {
        return new Promise((resolve, reject) => {
            admins.forEach((admin) => {
                const { salt, hashedPassword } = hashAdminPassword(admin.password);
                const insertAdminQuery = `
            INSERT INTO haze__administrators VALUES (
                0,
                "${admin.email}",
                "${hashedPassword}",
                "${salt}"
            )`;
                this.connection.query(insertAdminQuery, (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            });
            resolve();
            console.log("[UPDATE] Inserting admins into table « haze__administrators »");
        });
    }
    insertExamplePages() {
        return new Promise((resolve, reject) => {
            const insertPageExampleQuery = `
        INSERT INTO haze__pages VALUES (
          0,
          "Example",
          0,
          "example",
          "This is an example page",
          "Example page",
          "This is an example page",
          1
        )
      `;
            const insertPagePostsQuery = `
        INSERT INTO haze__pages VALUES (
          0,
          "Blog",
          0,
          "blog",
          "This is a blog page",
          "Blog",
          "This is the blog page",
          0
        )
      `;
            this.connection.query(insertPageExampleQuery, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
            this.connection.query(insertPagePostsQuery, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
            console.log("[UPDATE] Inserting pages into table « haze__pages »");
        });
    }
    insertExamplePosts() {
        return new Promise((resolve, reject) => {
            const insertPostExampleQuery = `
        INSERT INTO haze__posts VALUES (
          0,
          "My new post",
          "my-new-post",
          0,
          "Lorem ipusm dolor sit amet"
        )
      `;
            this.connection.query(insertPostExampleQuery, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
            console.log("[UPDATE] Inserting posts into table « haze_posts »");
        });
    }
    insertExampleCategories() {
        return new Promise((resolve, reject) => {
            const insertPostExampleQuery = `
        INSERT INTO haze__posts_categories VALUES (
          0,
          "My First Category"
        )
      `;
            this.connection.query(insertPostExampleQuery, (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
            console.log("[UPDATE] Inserting categories into table « haze__posts_categories »");
        });
    }
}
exports.MySQLInstallService = MySQLInstallService;
