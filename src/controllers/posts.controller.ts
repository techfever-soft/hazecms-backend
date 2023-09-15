import {
  BasicResponse,
  DataResponse,
} from "../models/interfaces/response.interface";
import { MySQLPostsService } from "../services/mysql/posts.service";
import fs from "fs";
import path from "path";

const configPath = path.join(__dirname, "../../../config.json");

export class PostsController {
  constructor() {}

  /**
   * Create one post
   * @param req any
   * @param res any
   */
  public createOne(req: any, res: any) {
    fs.readFile(configPath, "utf8", async (err: any, data: any) => {
      const jsonData = JSON.parse(data);

      switch (jsonData.database.databaseType) {
        case "mysql":
          const mySqlPostsService = new MySQLPostsService(
            jsonData.database.host,
            jsonData.database.username,
            jsonData.database.password,
            jsonData.database.port
          );

          await mySqlPostsService.useDatabase(jsonData.database.database);

          await mySqlPostsService.createOne(req.body);

          if (!jsonData.production) {
            console.log("[POSTS] Post inserted");
          }

          res.status(200).send(<BasicResponse>{
            type: "success",
            message: "Post added successfuly",
          });

          break;
      }
    });
  }

  /**
   * Get one post
   * @param req any
   * @param res any
   */
  public getOne(req: any, res: any) {
    fs.readFile(configPath, "utf8", async (err: any, data: any) => {
      const jsonData = JSON.parse(data);

      switch (jsonData.database.databaseType) {
        case "mysql":
          const mySqlPostsService = new MySQLPostsService(
            jsonData.database.host,
            jsonData.database.username,
            jsonData.database.password,
            jsonData.database.port
          );

          await mySqlPostsService.useDatabase(jsonData.database.database);

          const foundPost = await mySqlPostsService.getOne(req.params.postId);

          if (!jsonData.production) {
            console.log("[POSTS] Post selected");
          }

          res.status(200).send(<DataResponse>{
            type: "success",
            data: foundPost,
          });

          break;
      }
    });
  }

  /**
   * Get one post
   * @param req any
   * @param res any
   */
  public getOneBySlug(req: any, res: any) {
    fs.readFile(configPath, "utf8", async (err: any, data: any) => {
      const jsonData = JSON.parse(data);

      switch (jsonData.database.databaseType) {
        case "mysql":
          const mySqlPostsService = new MySQLPostsService(
            jsonData.database.host,
            jsonData.database.username,
            jsonData.database.password,
            jsonData.database.port
          );

          await mySqlPostsService.useDatabase(jsonData.database.database);

          const foundPost = await mySqlPostsService.getOneBySlug(req.query.postSlug);

          if (!jsonData.production) {
            console.log("[POSTS] Post selected");
          }

          res.status(200).send(<DataResponse>{
            type: "success",
            data: foundPost,
          });

          break;
      }
    });
  }

  /**
   * Update one post
   * @param req any
   * @param res any
   */
  public updateOne(req: any, res: any) {
    fs.readFile(configPath, "utf8", async (err: any, data: any) => {
      const jsonData = JSON.parse(data);

      switch (jsonData.database.databaseType) {
        case "mysql":
          const mySqlPostsCategoriesService = new MySQLPostsService(
            jsonData.database.host,
            jsonData.database.username,
            jsonData.database.password,
            jsonData.database.port
          );

          await mySqlPostsCategoriesService.useDatabase(
            jsonData.database.database
          );

          await mySqlPostsCategoriesService.updateOne(
            req.params.postId,
            req.body
          );

          if (!jsonData.production) {
            console.log("[POSTS] Post edited");
          }

          res.status(200).send(<BasicResponse>{
            type: "success",
            message: "Post edited successfuly",
          });

          break;
      }
    });
  }

  /**
   * Delete one post
   * @param req any
   * @param res any
   */
  public deleteOne(req: any, res: any) {
    fs.readFile(configPath, "utf8", async (err: any, data: any) => {
      const jsonData = JSON.parse(data);

      switch (jsonData.database.databaseType) {
        case "mysql":
          const mySqlPostsCategoriesService = new MySQLPostsService(
            jsonData.database.host,
            jsonData.database.username,
            jsonData.database.password,
            jsonData.database.port
          );

          await mySqlPostsCategoriesService.useDatabase(
            jsonData.database.database
          );

          await mySqlPostsCategoriesService.deleteOne(req.params.postId);

          if (!jsonData.production) {
            console.log("[POSTS] Post deleted");
          }

          res.status(200).send(<BasicResponse>{
            type: "success",
            message: "Post deleted successfuly",
          });

          break;
      }
    });
  }

  /**
   * Get all posts
   * @param req any
   * @param res any
   */
  public getAll(req: any, res: any) {
    fs.readFile(configPath, "utf8", async (err: any, data: any) => {
      const jsonData = JSON.parse(data);

      switch (jsonData.database.databaseType) {
        case "mysql":
          const mySqlPostsService = new MySQLPostsService(
            jsonData.database.host,
            jsonData.database.username,
            jsonData.database.password,
            jsonData.database.port
          );

          await mySqlPostsService.useDatabase(jsonData.database.database);

          const allPosts = await mySqlPostsService.getAll();

          if (!jsonData.production) {
            console.log("[POSTS] Post list selected");
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
