import * as mysql from "mysql";

import { MySQLConnectionMiddleware } from "../../middlewares/mysql.middleware";

export class MySQLPostsService {
  public connection: mysql.Connection;

  constructor(host: string, user: string, password: string, port: number) {
    this.connection = new MySQLConnectionMiddleware(
      host,
      user,
      password,
      port
    ).getConnection();
  }

  /**
   * ANCHOR: CREATE OPERATIONS
   */

  public createOne(data: {
    name: string;
    slug: string;
    categoryId: number;
    content: string;
    tags: any[];
    published: boolean;
  }) {
    return new Promise((resolve, reject) => {
      const tagsJson = JSON.stringify(data.tags);

      const insertPostQuery = `
      INSERT INTO haze__posts VALUES (
          0,
          "${data.name}",
          "${data.slug}",
          "${data.categoryId}",
          '${data.content}',
          '${tagsJson}',
          ${data.published ? 1 : 0},
          NOW(),
          NOW(),
          NOW()
      )`;

      this.connection.query(insertPostQuery, (err, res) => {
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

  public getOne(postId: string | number) {
    return new Promise<any>((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM haze__posts WHERE id = " + postId,
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  public getOneBySlug(postSlug: string) {
    return new Promise<any>((resolve, reject) => {
      this.connection.query(
        "SELECT * FROM haze__posts WHERE slug = '" + postSlug + "'",
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }

  public getAll() {
    return new Promise<any[]>((resolve, reject) => {
      this.connection.query("SELECT * FROM haze__posts", (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  /**
   * ANCHOR: UPDATE OPERATIONS
   */
  public updateOne(
    id: string | number,
    data: {
      name: string;
      slug: string;
      categoryId: number | string;
      content: string;
      tags: string[];
      published: boolean;
    }
  ) {
    return new Promise<any[]>((resolve, reject) => {
      const updatePostQuery = `
      UPDATE haze__posts SET
          name="${data.name}",
          slug="${data.slug}",
          categoryId="${data.categoryId}",
          content='${data.content}',
          tags='${JSON.stringify(data.tags)}',
          updatedAt=NOW(),
          published=${data.published ? 1 : 0},
          publishedAt=${data.published ? "NOW()" : "NULL"}
          WHERE id = ${id}`;

      this.connection.query(updatePostQuery, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  /**
   * ANCHOR: DELETE OPERATIONS
   */

  public deleteOne(id: string | number) {
    return new Promise<any[]>((resolve, reject) => {
      this.connection.query(
        "DELETE FROM haze__posts WHERE id = " + id,
        (err, res) => {
          if (err) reject(err);
          else resolve(res);
        }
      );
    });
  }
}
