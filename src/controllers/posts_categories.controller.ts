import fs from "fs";
import path from "path";
import { MySQLPostsCategoriesService } from "../services/mysql/posts_categories.service";
import { BasicResponse, DataResponse } from "../interfaces/response.interface";

const configPath = path.join(__dirname, "../../../config.json");

export class PostsCategoriesController {
  constructor() {}

  /**
   * Create one post category
   * @param req any
   * @param res any
   */
  public createOne(req: any, res: any) {
    fs.readFile(configPath, "utf8", async (err: any, data: any) => {
      const jsonData = JSON.parse(data);

      switch (jsonData.database.databaseType) {
        case "mysql":
          const mySqlPostsCategoriesService = new MySQLPostsCategoriesService(
            jsonData.database.host,
            jsonData.database.username,
            jsonData.database.password,
            jsonData.database.port
          );

          await mySqlPostsCategoriesService.useDatabase(
            jsonData.database.database
          );

          await mySqlPostsCategoriesService.createOne({
            name: req.body.name,
          });

          if (!jsonData.production) {
            console.log("[POST CATEGORIES] Category added");
          }

          res.status(200).send(<BasicResponse>{
            type: "success",
            message: "Post category added successfuly",
          });

          break;
      }
    });
  }

  /**
   * Delete one post category
   * @param req any
   * @param res any
   */
  public deleteOne(req: any, res: any) {
    fs.readFile(configPath, "utf8", async (err: any, data: any) => {
      const jsonData = JSON.parse(data);

      switch (jsonData.database.databaseType) {
        case "mysql":
          const mySqlPostsCategoriesService = new MySQLPostsCategoriesService(
            jsonData.database.host,
            jsonData.database.username,
            jsonData.database.password,
            jsonData.database.port
          );

          await mySqlPostsCategoriesService.useDatabase(
            jsonData.database.database
          );

          await mySqlPostsCategoriesService.deleteOne(req.params.categoryId);

          if (!jsonData.production) {
            console.log("[POST CATEGORIES] Category deleted");
          }

          res.status(200).send(<BasicResponse>{
            type: "success",
            message: "Post category deleted successfuly",
          });

          break;
      }
    });
  }

  /**
   * Get one post category
   * @param req any
   * @param res any
   */
  public getAll(req: any, res: any) {
    fs.readFile(configPath, "utf8", async (err: any, data: any) => {
      const jsonData = JSON.parse(data);

      switch (jsonData.database.databaseType) {
        case "mysql":
          const mySqlPostsCategoriesService = new MySQLPostsCategoriesService(
            jsonData.database.host,
            jsonData.database.username,
            jsonData.database.password,
            jsonData.database.port
          );

          await mySqlPostsCategoriesService.useDatabase(
            jsonData.database.database
          );

          const allPosts = await mySqlPostsCategoriesService.getAll();

          if (!jsonData.production) {
            console.log("[POST CATEGORIES] Categories selected");
          }

          res.status(200).send(<DataResponse>{
            type: "success",
            data: allPosts,
          });

          break;
      }
    });
  }
}
