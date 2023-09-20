import chalk from "chalk";
import { ConfigMiddleware } from "../middlewares/config.middleware";
import { DatabaseMiddleware } from "../middlewares/database.middleware";
import {
  BasicResponse,
  DataResponse,
} from "../models/interfaces/response.interface";
import { MySQLPagesService } from "../services/mysql/pages.service";

export class PagesController {
  constructor() {}

  /**
   * Gets all pages
   * @param req any
   * @param res any
   */
  public async getAll(req: any, res: any) {
    try {
      let allUsers: any[] = [];

      let dbMiddleware = new DatabaseMiddleware();
      const database = await dbMiddleware.getCurrentDatabase();
      const { databaseType, databaseName } = database;

      switch (databaseType) {
        case "mysql":
          const pageService = await dbMiddleware.initDatabaseWithService(
            MySQLPagesService
          );

          await pageService.useDatabase(databaseName);

          // NOTE: Main request
          allUsers = await pageService.getAll();

          break;
      }

      let configMiddleware = new ConfigMiddleware();
      const config = await configMiddleware.getCurrentConfig();
      if (!config.production) {
        console.log(`[${chalk.yellowBright("PAGES")}] pages/getAll requested`);
      }

      res.status(200).send(<DataResponse>{
        type: "success",
        data: allUsers,
      });
    } catch (e) {
      res.status(500).send(<BasicResponse>{
        type: "error",
        message: e,
      });
    }
  }

  /**
   * Gets one page
   * @param req any
   * @param res any
   */
  public async getOne(req: any, res: any) {
    try {
      let page: any;

      let dbMiddleware = new DatabaseMiddleware();
      const database = await dbMiddleware.getCurrentDatabase();
      const { databaseType, databaseName } = database;

      switch (databaseType) {
        case "mysql":
          const pageService = await dbMiddleware.initDatabaseWithService(
            MySQLPagesService
          );

          await pageService.useDatabase(databaseName);

          // NOTE: Main request
          page = await pageService.getOne(req.query.path);

          break;
      }

      let configMiddleware = new ConfigMiddleware();
      const config = await configMiddleware.getCurrentConfig();
      if (!config.production) {
        console.log(`[${chalk.yellowBright("PAGES")}] pages/getOne requested`);
      }

      res.status(200).send(<DataResponse>{
        type: "success",
        data: page,
      });
    } catch (e) {
      res.status(500).send(<BasicResponse>{
        type: "error",
        message: e,
      });
    }
  }

  /**
   * Deletes one page
   * @param req any
   * @param res any
   */
  public async deleteOne(req: any, res: any) {
    try {
      let dbMiddleware = new DatabaseMiddleware();
      const database = await dbMiddleware.getCurrentDatabase();
      const { databaseType, databaseName } = database;

      switch (databaseType) {
        case "mysql":
          const pageService = await dbMiddleware.initDatabaseWithService(
            MySQLPagesService
          );

          await pageService.useDatabase(databaseName);

          // NOTE: Main request
          await pageService.deleteOne(req.params.pageId);

          break;
      }

      let configMiddleware = new ConfigMiddleware();
      const config = await configMiddleware.getCurrentConfig();
      if (!config.production) {
        console.log(
          `[${chalk.yellowBright("PAGES")}] pages/deleteOne requested`
        );
      }

      res.status(200).send(<BasicResponse>{
        type: "success",
      });
    } catch (e) {
      res.status(500).send(<BasicResponse>{
        type: "error",
        message: e,
      });
    }
  }
}
