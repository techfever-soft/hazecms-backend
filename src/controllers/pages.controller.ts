import {
  BasicResponse,
  DataResponse,
} from "../models/interfaces/response.interface";
import { MySQLPagesService } from "../services/mysql/pages.service";
import fs from "fs";
import path from "path";

const configPath = path.join(__dirname, "../../../config.json");

export class PagesController {
  constructor() {}

  public getAll(req: any, res: any) {
    fs.readFile(configPath, "utf8", async (err: any, data: any) => {
      const jsonData = JSON.parse(data);

      switch (jsonData.database.databaseType) {
        case "mysql":
          const mySqlPostsService = new MySQLPagesService(
            jsonData.database.host,
            jsonData.database.username,
            jsonData.database.password,
            jsonData.database.port
          );

          await mySqlPostsService.useDatabase(jsonData.database.database);

          mySqlPostsService.getAll().then((pages) => {
            if (!jsonData.production) {
              console.log("[PAGES] Pages selected");
            }

            res.status(200).send(<DataResponse>{
              type: "success",
              message: "Post added successfuly",
              data: pages,
            });
          });

          break;
      }
    });
  }

  public getOne(req: any, res: any) {
    fs.readFile(configPath, "utf8", async (err: any, data: any) => {
      const jsonData = JSON.parse(data);

      switch (jsonData.database.databaseType) {
        case "mysql":
          const mySqlPostsService = new MySQLPagesService(
            jsonData.database.host,
            jsonData.database.username,
            jsonData.database.password,
            jsonData.database.port
          );

          if (req.query.path) {
            await mySqlPostsService.useDatabase(jsonData.database.database);
            console.log("PARAMS Q1 =>", req.query.path);

            mySqlPostsService.getOne(req.query.path).then((page) => {
              if (!jsonData.production) {
                console.log("[PAGES] Page selected");
              }

              res.status(200).send(<DataResponse>{
                type: "success",
                message: "Post added successfuly",
                data: page,
              });
            });
          } else {
            res.status(500).send(<BasicResponse>{
              type: "error",
              message: "Invalid parameter",
            });
          }

          break;
      }
    });
  }
}
