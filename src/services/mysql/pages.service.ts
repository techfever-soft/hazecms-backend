import * as mysql from "mysql";

import { MySQLConnectionMiddleware } from "../../middlewares/mysql.middleware";

export class MySQLPagesService {
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

  public getAll() {
    return new Promise((resolve, reject) => {
      const selectPageQuery = `SELECT * FROM haze__pages`;

      this.connection.query(selectPageQuery, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  public getOne(path: string) {
    return new Promise((resolve, reject) => {
      const selectPageQuery = `SELECT * FROM haze__pages WHERE url = "${path}"`;

      this.connection.query(selectPageQuery, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  public deleteOne(id: string | number) {
    return new Promise<any[]>((resolve, reject) => {
      this.connection.query(
        "DELETE FROM haze__pages WHERE id = " + id,
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }
}
