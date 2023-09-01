import * as mysql from "mysql";
import axios from "axios";
import { MySQLInstallService } from "../../services/mysql_install.service";
import { MySQLService } from "../../services/mysql.service";
import { baseAPIUrl } from "../../../config";
import {
  AppInstallForm,
  AppInstallFormAdmin,
} from "../../models/interfaces/app.interface";

export class MySQLInstallController {
  constructor() {}

  public checkDatabaseAvailability(req: any, res: any) {
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
  }

  public async finalizeInstall(req: any, res: any) {
    const newAppInstance: AppInstallForm = {
      activation: {
        apiKey: req.body.activation.apiKey,
      },
      database: {
        databaseType: req.body.database.databaseType,
        host: req.body.database.host,
        username: req.body.database.username,
        password: req.body.database.password,
        database: req.body.database.database
          ? req.body.database.database
          : "hazecms",
        port: req.body.database.port,
      },
      config: {
        adminsList: req.body.config.adminsList as AppInstallFormAdmin[],
      },
    };

    // console.log(newAppInstance);

    const mySQLInstallService = new MySQLInstallService(
      newAppInstance.database.host,
      newAppInstance.database.username,
      newAppInstance.database.password,
      newAppInstance.database.port
    );

    const databaseName = newAppInstance.database.database;

    /**
     * ANCHOR Step one: Create app instance
     */
    // TODO: Create app instance
    // axios
    //   .post(baseAPIUrl + "app/createAppInstance", newAppInstance)
    //   .then(() => {
    //     console.log("created app instance");
    //   });

    try {
      /**
       * ANCHOR Step two: Create database & tables
       */
      await mySQLInstallService.createDatabase(databaseName);
      await mySQLInstallService.createAdminTable();
      await mySQLInstallService.createPagesTable();
      await mySQLInstallService.createPostsTable();
      await mySQLInstallService.createPostsCategoriesTable();
      await mySQLInstallService.createConfigTable();

      await mySQLInstallService.insertAdmins(newAppInstance.config.adminsList);
      await mySQLInstallService.insertExamplePages();
      await mySQLInstallService.insertExampleCategories();
      await mySQLInstallService.insertExamplePosts();
      await mySQLInstallService.insertDefaultConfig();

      /**
       * ANCHOR Step four: Return the status
       */
      res.status(200).send({
        type: "success",
        message: "App installed successfully",
      });
    } catch (e) {
      console.log(e);

      res.status(500).send({
        type: "error",
        message: "Can't install the app",
      });
    }
  }
}
