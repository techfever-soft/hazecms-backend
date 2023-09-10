import { BasicResponse, DataResponse } from "../interfaces/response.interface";
import { MySQLAdminService } from "../services/mysql/admin.service";
import fs from "fs";
import path from "path";

const configPath = path.join(__dirname, "../../../config.json");

export class AdminController {
  constructor() {}

  public login(req: any, res: any) {
    fs.readFile(configPath, "utf8", async (err: any, data: any) => {
      const jsonData = JSON.parse(data);

      switch (jsonData.database.databaseType) {
        case "mysql":
          const mySqlAdminService = new MySQLAdminService(
            jsonData.database.host,
            jsonData.database.username,
            jsonData.database.password,
            jsonData.database.port
          );

          await mySqlAdminService.useDatabase(jsonData.database.database);

          mySqlAdminService
            .login(req, res)
            .then((result) => {
              console.log(result);
              if (!jsonData.production) {
                console.log("[ADMIN LOGIN] Logged in");
              }

              res.status(200).send(<DataResponse>{
                type: "success",
                data: {},
              });
            })
            .catch((e) => {
              console.log(e);

              res.status(500).send(<BasicResponse>{
                type: "error",
                message: "wrong password",
              });
            });

          break;
      }
    });
  }
}
