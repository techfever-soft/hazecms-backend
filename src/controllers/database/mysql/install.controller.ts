import * as mysql from "mysql";
import axios from "axios";
import {
  AppInstallForm,
  AppInstallFormAdmin,
} from "../../../models/interfaces/app.interface";
import fs from "fs";
import path from "path";
import { MySQLInstallService } from "../../../services/mysql/install.service";
import { BasicResponse } from "../../../models/interfaces/response.interface";

export class MySQLInstallController {
  constructor() {}

  /**
   * Checks if the database is available
   * @param req any
   * @param res any
   */
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
        res.status(500).send(<BasicResponse>{
          type: "error",
          message: "Error to access to database",
          code: err.code,
        });
        return;
      }
      res.status(200).send(<BasicResponse>{
        type: "success",
        message: "Connected successfuly to database",
      });
    });
  }

  /**
   * Finalizes the install by executing queries on mySQL
   * @param req any
   * @param res any
   */
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
        language: req.body.config.language,
        timezone: req.body.config.timezone,
        adminsList: req.body.config.adminsList as AppInstallFormAdmin[],
      },
    };

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
    // TODO: Create app instance on core server
    // axios
    //   .post(serverAPIUrl + "app/createAppInstance", newAppInstance)
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

      await mySQLInstallService.insertAdmins(newAppInstance.config.adminsList);
      await mySQLInstallService.insertExamplePages();
      await mySQLInstallService.insertExampleCategories();
      await mySQLInstallService.insertExamplePosts();

      await mySQLInstallService.createUsersTable();

      await mySQLInstallService.createConfigTable();
      await mySQLInstallService.insertDefaultConfig(
        newAppInstance.config.language,
        newAppInstance.config.timezone
      );

      /**
       * ANCHOR Step three: Update CMS internal config
       */
      const configPath = path.join(__dirname, "../../../../../config.json");

      fs.readFile(configPath, "utf8", (err: any, data: any) => {
        const jsonData = JSON.parse(data);

        jsonData.database = {};

        jsonData.production = false;

        jsonData.database.databaseType = newAppInstance.database.databaseType;
        jsonData.database.host = newAppInstance.database.host;
        jsonData.database.username = newAppInstance.database.username;
        jsonData.database.password = newAppInstance.database.password;
        jsonData.database.port = newAppInstance.database.port;
        jsonData.database.database = newAppInstance.database.database;

        const updatedJson = JSON.stringify(jsonData, null, 2);
        fs.writeFile(configPath, updatedJson, "utf8", (err: any) => {
          if (!err) {
            console.log("[UPDATE] Updated JSON config !");
          }
        });
      });

      /**
       * ANCHOR Step four: Return the status
       */
      res.status(200).send(<BasicResponse>{
        type: "success",
        message: "App installed successfully",
      });
    } catch (e) {
      console.log(e);

      res.status(500).send(<BasicResponse>{
        type: "error",
        message: "Can't install the app",
      });
    }
  }
}
