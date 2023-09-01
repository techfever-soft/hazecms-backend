import * as mysql from "mysql";

import { MySQLConnectionMiddleware } from "../middlewares/database.middleware";

export class MySQLService {
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
  

  /**
   * ANCHOR: READ OPERATIONS
   */

  /**
   * ANCHOR: UPDATE OPERATIONS
   */

  /**
   * ANCHOR: DELETE OPERATIONS
   */
}
