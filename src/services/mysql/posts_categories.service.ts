import * as mysql from "mysql";

import { MySQLConnectionMiddleware } from "../../middlewares/database.middleware";

export class MySQLPostCategoryService {
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

  /**
   * ANCHOR: CREATE OPERATIONS
   */

  public createOne(data: { name: string }) {
    return new Promise((resolve, reject) => {
      const insertPostCategoryQuery = `
      INSERT INTO haze__posts_categories VALUES (
          0,
          "${data.name}"
      )`;

      this.connection.query(insertPostCategoryQuery, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  /**
   * ANCHOR: READ OPERATIONS
   */

  public useDatabase(database: string) {
    return new Promise<void>((resolve, reject) => {
      const useDatabaseQuery = `USE ${database}`;
      this.connection.query(useDatabaseQuery, (err: any) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  public getOne(postId: string) {
    return new Promise<any>((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM haze__posts_categories WHERE id = " + postId,
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  public getAll() {
    return new Promise<any[]>((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM haze__posts_categories",
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  /**
   * ANCHOR: UPDATE OPERATIONS
   */

  /**
   * ANCHOR: DELETE OPERATIONS
   */

  public deleteOne(id: string | number) {
    return new Promise<any[]>((resolve, reject) => {
      this.connection.query(
        "DELETE FROM haze__posts_categories WHERE id = " + id,
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }
}
