import * as mysql from "mysql";

import { MySQLConnectionMiddleware } from "../../middlewares/mysql.middleware";
import crypto from "crypto";

const jwt = require("jsonwebtoken");

export class MySQLUserService {
  public connection: mysql.Connection;
  // TODO: Secure JWT
  private secretJWTKey: string = "test";

  constructor(host: string, user: string, password: string, port: number) {
    this.connection = new MySQLConnectionMiddleware(
      host,
      user,
      password,
      port
    ).getConnection();
  }

  // private generateJWTSecretKey() {
  //   const specialCharacters = "!@#$%^&*()_-+=[]{}|;:,.<>?";

  //   const keyLength = 64;

  //   const characters =
  //     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" +
  //     specialCharacters;
  //   let key = "";

  //   for (let i = 0; i < keyLength; i++) {
  //     const indexAleatoire = crypto.randomInt(characters.length);
  //     key += characters.charAt(indexAleatoire);
  //   }

  //   this.secretJWTKey = key;
  // }

  private hashPassword(password: string): {
    passwordSalt: string;
    passwordHash: string;
  } {
    const passwordSalt = crypto.randomBytes(256).toString("hex");
    const passwordHash = crypto
      .pbkdf2Sync(password, passwordSalt, 10000, 128, "sha512")
      .toString("hex");

    return {
      passwordSalt,
      passwordHash,
    };
  }

  private verifyPassword(password: string, salt: string, hash: string) {
    const newHash = crypto
      .pbkdf2Sync(password, salt, 10000, 128, "sha512")
      .toString("hex");
    return newHash === hash;
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

  public getCurrentUser(token: string) {
    return new Promise((resolve, reject) => {
      try {
        console.log(token);
        const decodedToken = jwt.verify(token, this.secretJWTKey);
        console.log(decodedToken);
        resolve(decodedToken);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  }

  public refreshToken() {
    return new Promise((resolve, reject) => {
      const tokenPayload = {
        id: 1,
      };
      const options = { expiresIn: "1h" };
      const token = jwt.sign(tokenPayload, this.secretJWTKey, options);
      resolve(token);
    });
  }

  public login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      const loginQuery =
        "SELECT * FROM haze__users WHERE email = '" + email + "'";
      this.connection.query(loginQuery, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          if (res[0] && res[0].id) {
            const checkPassword = this.verifyPassword(
              password,
              res[0].passwordSalt,
              res[0].passwordHash
            );

            if (checkPassword) {
              console.log("OK");

              const tokenPayload = {
                id: res[0].id,
                role: res[0].role,
              };
              const options = { expiresIn: "1h" };
              const token = jwt.sign(tokenPayload, this.secretJWTKey, options);

              resolve(token);
            } else {
              console.log("wrong");
              reject("wrong password !");
            }
          } else {
            reject("unknown user");
          }
        }
      });
    });
  }

  public addOne(userData: any) {
    return new Promise((resolve, reject) => {
      const { passwordHash, passwordSalt } = this.hashPassword(
        userData.password
      );

      const addUserQuery = `INSERT INTO haze__users VALUES (
        0,
        "${userData.username}",
        "${userData.email}",
        "${passwordHash}",
        "${passwordSalt}",
        NOW(),
        NULL,
        "default"
      )`;

      this.connection.query(addUserQuery, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  public getOne(userId: string | number) {
    return new Promise<any>((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM haze__users WHERE id = " + userId,
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  public getAll() {
    return new Promise<any[]>((resolve, reject) => {
      this.connection.query("SELECT * FROM haze__users", (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }
}
