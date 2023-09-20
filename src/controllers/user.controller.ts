import {
  BasicResponse,
  DataResponse,
} from "../models/interfaces/response.interface";
import { DatabaseMiddleware } from "../middlewares/database.middleware";
import { MySQLUserService } from "../services/mysql/user.service";
import chalk from "chalk";
import { ConfigMiddleware } from "../middlewares/config.middleware";

export class UserController {
  constructor() {}

  // public async refreshToken(req: any, res: any) {
  //   try {
  //     let dbMiddleware = new DatabaseMiddleware();
  //     const database = await dbMiddleware.getCurrentDatabase();
  //     const { databaseType, databaseName } = database;

  //     switch (databaseType) {
  //       case "mysql":
  //         const userService = await dbMiddleware.initDatabaseWithService(
  //           MySQLUserService
  //         );

  //         await userService.useDatabase(databaseName);

  //         // NOTE: Main request
  //         userService
  //           .refreshToken()
  //           .then((token: string) => {
  //             res.status(200).send(<DataResponse>{
  //               type: "success",
  //               message: "User token valid",
  //               data: {
  //                 token,
  //               },
  //             });
  //           })
  //           .catch((e: any) => {
  //             res.status(500).send(<BasicResponse>{
  //               type: "error",
  //               message: e,
  //             });
  //           });

  //         break;
  //     }

  //     let configMiddleware = new ConfigMiddleware();
  //     const config = await configMiddleware.getCurrentConfig();
  //     if (!config.production) {
  //       console.log(
  //         `[${chalk.yellowBright("USERS")}] users/refreshToken requested`
  //       );
  //     }
  //   } catch (e) {
  //     res.status(500).send(<BasicResponse>{
  //       type: "error",
  //       message: e,
  //     });
  //   }
  // }

  /**
   * Gets the logged in user data
   * @param req any
   * @param res any
   */
  public async getCurrentUser(req: any, res: any) {
    try {
      let dbMiddleware = new DatabaseMiddleware();
      const database = await dbMiddleware.getCurrentDatabase();
      const { databaseType, databaseName } = database;

      switch (databaseType) {
        case "mysql":
          const userService = await dbMiddleware.initDatabaseWithService(
            MySQLUserService
          );

          await userService.useDatabase(databaseName);

          // NOTE: Main request
          userService
            .getCurrentUser(req.query.token)
            .then((user: string) => {
              res.status(200).send(<DataResponse>{
                type: "success",
                message: "User token valid",
                data: {
                  user,
                },
              });
            })
            .catch((e: any) => {
              res.status(500).send(<BasicResponse>{
                type: "error",
                message: e,
              });
            });

          break;
      }

      let configMiddleware = new ConfigMiddleware();
      const config = await configMiddleware.getCurrentConfig();
      if (!config.production) {
        console.log(
          `[${chalk.yellowBright("USERS")}] users/getCurrentUser requested`
        );
      }
    } catch (e) {
      res.status(500).send(<BasicResponse>{
        type: "error",
        message: e,
      });
    }
  }

  /**
   * Login the user and send a JWT to client
   * @param req any
   * @param res any
   */
  public async login(req: any, res: any) {
    try {
      let dbMiddleware = new DatabaseMiddleware();
      const database = await dbMiddleware.getCurrentDatabase();
      const { databaseType, databaseName } = database;

      switch (databaseType) {
        case "mysql":
          const userService = await dbMiddleware.initDatabaseWithService(
            MySQLUserService
          );

          await userService.useDatabase(databaseName);

          // NOTE: Main request
          userService
            .login(req.body.email, req.body.password)
            .then((token: string) => {
              res.status(200).send(<DataResponse>{
                type: "success",
                message: "User logged in",
                data: {
                  token,
                },
              });
            })
            .catch((e: any) => {
              res.status(500).send(<BasicResponse>{
                type: "error",
                message: e,
              });
            });

          break;
      }

      let configMiddleware = new ConfigMiddleware();
      const config = await configMiddleware.getCurrentConfig();
      if (!config.production) {
        console.log(`[${chalk.yellowBright("USERS")}] users/login requested`);
      }
    } catch (e) {
      res.status(500).send(<BasicResponse>{
        type: "error",
        message: e,
      });
    }
  }

  /**
   * Register or add one user
   * @param req any
   * @param res any
   */
  public async addOne(req: any, res: any) {
    try {
      let dbMiddleware = new DatabaseMiddleware();
      const database = await dbMiddleware.getCurrentDatabase();
      const { databaseType, databaseName } = database;

      switch (databaseType) {
        case "mysql":
          const userService = await dbMiddleware.initDatabaseWithService(
            MySQLUserService
          );

          await userService.useDatabase(databaseName);

          // NOTE: Main request
          await userService.addOne(req.body);

          break;
      }

      let configMiddleware = new ConfigMiddleware();
      const config = await configMiddleware.getCurrentConfig();
      if (!config.production) {
        console.log(`[${chalk.yellowBright("USERS")}] users/addOne requested`);
      }

      res.status(200).send(<BasicResponse>{
        type: "success",
        message: "User created",
      });
    } catch (e) {
      res.status(500).send(<BasicResponse>{
        type: "error",
        message: e,
      });
    }
  }

  /**
   * Gets one user
   * @param req any
   * @param res any
   */
  public async getOne(req: any, res: any) {
    // TODO: Get one user
  }

  /**
   * Gets all users
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
          const userService = await dbMiddleware.initDatabaseWithService(
            MySQLUserService
          );

          await userService.useDatabase(databaseName);

          // NOTE: Main request
          allUsers = await userService.getAll();

          break;
      }

      let configMiddleware = new ConfigMiddleware();
      const config = await configMiddleware.getCurrentConfig();
      if (!config.production) {
        console.log(`[${chalk.yellowBright("USERS")}] users/getAll requested`);
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
}
