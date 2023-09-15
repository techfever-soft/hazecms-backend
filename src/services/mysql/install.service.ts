import * as mysql from "mysql";

import { AppInstallFormAdmin } from "../../models/interfaces/app.interface";
import { MySQLConnectionMiddleware } from "../../middlewares/database.middleware";
import crypto from "crypto";

export class MySQLInstallService {
  public connection: mysql.Connection;

  constructor(host: string, user: string, password: string, port: number) {
    const mySQLConnectionMiddleware = new MySQLConnectionMiddleware(
      host,
      user,
      password,
      port
    );

    this.connection = mySQLConnectionMiddleware.getConnection();
  }

  private hashAdminPassword(password: string): {
    salt: string;
    hashedPassword: string;
  } {
    const salt = crypto.randomBytes(256).toString("hex");
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 128, "sha512")
      .toString("hex");

    return {
      salt,
      hashedPassword,
    };
  }

  public createDatabase(databaseName: string) {
    return new Promise<void>((resolve, reject) => {
      const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS ${databaseName}`;
      this.connection.query(createDatabaseQuery, (err: any) => {
        if (err) reject(err);
        else resolve();
      });

      const useDatabaseQuery = `USE ${databaseName}`;
      this.connection.query(useDatabaseQuery, (err: any) => {
        if (err) reject(err);
        else resolve();
      });

      console.log("[CREATE] Creating database « " + databaseName + " »");
      console.log("[INFO] Using database « " + databaseName + " »");
    });
  }

  public createAdminTable() {
    return new Promise<void>((resolve, reject) => {
      const createAdminTableQuery = `
          CREATE TABLE IF NOT EXISTS haze__administrators (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            passwordHash TEXT NOT NULL,
            passwordSalt TEXT NOT NULL,
            createdAt DATETIME NOT NULL,
            lastSignIn DATETIME NULL
          )`;
      this.connection.query(createAdminTableQuery, (err: any) => {
        if (err) reject(err);
        else resolve();
      });

      console.log("[CREATE] Creating table « haze__administrators »");
    });
  }

  public createPagesTable() {
    return new Promise<void>((resolve, reject) => {
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

      this.connection.query(createPageTableQuery, (err: any) => {
        if (err) reject(err);
        else resolve();
      });

      console.log("[CREATE] Creating table « haze__pages »");
    });
  }

  public createPostsTable() {
    return new Promise<void>((resolve, reject) => {
      const createPostsTableQuery = `
          CREATE TABLE IF NOT EXISTS haze__posts (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL,
              slug VARCHAR(255) NOT NULL,
              categoryId INT NOT NULL,
              content TEXT NOT NULL,
              tags JSON NOT NULL,
              published BOOLEAN NOT NULL,
              createdAt DATETIME NOT NULL,
              publishedAt DATETIME NOT NULL,
              updatedAt DATETIME NOT NULL ON UPDATE NOW() 
          )`;

      this.connection.query(createPostsTableQuery, (err: any) => {
        if (err) reject(err);
        else resolve();
      });

      console.log("[CREATE] Creating table « haze__posts »");
    });
  }

  public createPostsCategoriesTable() {
    return new Promise<void>((resolve, reject) => {
      const createPostCategoriesTable = `
          CREATE TABLE IF NOT EXISTS haze__posts_categories (
              id INT AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(255) NOT NULL
          )`;

      this.connection.query(createPostCategoriesTable, (err: any) => {
        if (err) reject(err);
        else resolve();
      });

      console.log("[CREATE] Creating table « haze__posts_categories »");
    });
  }

  public createUsersTable() {
    return new Promise<void>((resolve, reject) => {
      const createUsersTable = `
          CREATE TABLE IF NOT EXISTS haze__users (
              id INT AUTO_INCREMENT PRIMARY KEY,
              username VARCHAR(255) NOT NULL,
              email VARCHAR(255) NOT NULL,
              passwordHash TEXT NOT NULL,
              passwordSalt TEXT NOT NULL,
              createdAt DATETIME NOT NULL,
              lastSignIn DATETIME NULL
          )`;

      this.connection.query(createUsersTable, (err: any) => {
        if (err) reject(err);
        else resolve();
      });

      console.log("[CREATE] Creating table « haze__users »");
    });
  }

  public createConfigTable() {
    return new Promise<void>((resolve, reject) => {
      const updateConfigTableQuery = `
        CREATE TABLE IF NOT EXISTS haze__config (
          id INT AUTO_INCREMENT PRIMARY KEY,
          keyName VARCHAR(255) NOT NULL,
          value JSON,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )`;

      this.connection.query(updateConfigTableQuery, (err: any) => {
        if (err) reject(err);
        else resolve();
      });

      console.log("[CREATE] Creating table « haze__config »");
    });
  }

  /**
   * ANCHOR: UPDATE OPERATIONS
   */

  public insertAdmins(admins: AppInstallFormAdmin[]) {
    return new Promise<void>((resolve, reject) => {
      admins.forEach((admin) => {
        const { salt, hashedPassword } = this.hashAdminPassword(admin.password);

        const insertAdminQuery = `
            INSERT INTO haze__administrators VALUES (
                0,
                "${admin.email}",
                "${hashedPassword}",
                "${salt}",
                NOW(),
                NULL
            )`;

        this.connection.query(insertAdminQuery, (err: any) => {
          if (err) reject(err);
          else resolve();
        });
      });

      resolve();

      console.log(
        "[UPDATE] Inserting admins into table « haze__administrators »"
      );
    });
  }

  public insertExamplePages() {
    return new Promise<void>((resolve, reject) => {
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

      this.connection.query(insertPageExampleQuery, (err: any) => {
        if (err) reject(err);
        else resolve();
      });
      this.connection.query(insertPagePostsQuery, (err: any) => {
        if (err) reject(err);
        else resolve();
      });

      console.log("[UPDATE] Inserting pages into table « haze__pages »");
    });
  }

  public insertExamplePosts() {
    return new Promise<void>((resolve, reject) => {
      const insertPostExampleQuery = `
        INSERT INTO haze__posts VALUES (
          0,
          "My new post",
          "my-new-post",
          1,
          "Lorem ipusm dolor sit amet",
          '["myFirstTag"]',
          1,
          NOW(),
          NOW(),
          NOW()
        )
      `;

      this.connection.query(insertPostExampleQuery, (err: any) => {
        if (err) reject(err);
        else resolve();
      });

      console.log("[UPDATE] Inserting posts into table « haze_posts »");
    });
  }

  public insertExampleCategories() {
    return new Promise<void>((resolve, reject) => {
      const insertCategoryExampleQuery = `
        INSERT INTO haze__posts_categories VALUES (
          0,
          "My First Category"
        )
      `;

      this.connection.query(insertCategoryExampleQuery, (err: any) => {
        if (err) reject(err);
        else resolve();
      });

      console.log(
        "[UPDATE] Inserting categories into table « haze__posts_categories »"
      );
    });
  }

  public insertDefaultConfig(language: string, timezone: string) {
    return new Promise<void>((resolve, reject) => {
      const insertLanguageConfigQuery = `
        INSERT INTO haze__config VALUES (
          0,
          "language",
          '${JSON.stringify(language)}',
          NOW(),
          NOW()
        )
      `;

      const insertTimezoneConfigQuery = `
      INSERT INTO haze__config VALUES (
        0,
        "timezone",
        '${JSON.stringify(timezone)}',
        NOW(),
        NOW()
      )
    `;

      this.connection.query(insertLanguageConfigQuery, (err: any) => {
        if (err) reject(err);
        else resolve();
      });

      this.connection.query(insertTimezoneConfigQuery, (err: any) => {
        if (err) reject(err);
        else resolve();
      });

      console.log(
        "[UPDATE] Inserting default config into table « haze__config »"
      );
    });
  }
}
