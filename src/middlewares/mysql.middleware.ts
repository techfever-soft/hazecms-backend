import * as mysql from "mysql";

export class MySQLConnectionMiddleware {
  constructor(
    private host: string,
    private user: string,
    private password: string,
    private port: number
  ) {}

  public getConnection(): mysql.Connection {
    const connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      port: this.port,
    });

    return connection;
  }
}
