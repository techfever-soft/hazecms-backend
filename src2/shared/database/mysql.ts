import * as mysql from "mysql";
import { App } from "../../core/classes/app.class";

/**
 * ANCHOR: Public methods
 */

export const checkDatabaseAvailability = (req: any, res: any) => {
  const connection = mysql.createConnection({
    host: req.body.host,
    user: req.body.username,
    password: req.body.password,
    database: req.body.database,
    port: req.body.port,
  });

  connection.connect((err) => {
    if (err) {
      res.status(500).send(<any>{
        type: "error",
        message: "Error to access to database",
        code: err.code,
      });
      return;
    }
    res.status(200).send(<any>{
      type: "success",
      message: "Connected successfuly to database",
    });
  });
};

export async function finalizeInstall(req: any, res: any) {
  // NOTE Step 1: Create app instance
  const appInstance = await new App().createAppInstance(req.body);

  console.log(appInstance);

  // NOTE Step 2: Create database
}
