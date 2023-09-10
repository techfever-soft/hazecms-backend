import * as mysql from "mysql";

import { MySQLConnectionMiddleware } from "../../middlewares/database.middleware";
import bcrypt from "bcrypt";
import crypto from "crypto";

export class MySQLAdminService {
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

  public useDatabase(database: string) {
    return new Promise<void>((resolve, reject) => {
      const useDatabaseQuery = `USE ${database}`;
      this.connection.query(useDatabaseQuery, (err: any) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  private verifyPassword(password: string, salt: string, hash: string) {
    const newHash = crypto
      .pbkdf2Sync(password, salt, 10000, 128, "sha512")
      .toString("hex");
    return newHash === hash;
  }

  public login(req: any, res: any) {
    return new Promise((resolve, reject) => {
      const { email, password } = req.body;

      const loginQuery =
        "SELECT * FROM haze__administrators WHERE email = '" + email + "'";
      this.connection.query(loginQuery, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log(res[0]);

          const checkPassword = this.verifyPassword(
            password,
            res[0].passwordSalt,
            res[0].passwordHash
          );

          if (checkPassword) {
            // TODO: Store the user session storage
            resolve("password correct");
          } else {
            reject("wrong password !");
          }
        }
      });
    });
  }
}
