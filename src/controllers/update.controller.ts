import { ConfigMiddleware } from "../middlewares/config.middleware";
import chalk from "chalk";
import { exec } from "child_process";
import path from "path";
import { BasicResponse } from "../models/interfaces/response.interface";

export class UpdatesController {
  public async updateCMS(req: any, res: any) {
    console.log(
      "[" + chalk.yellowBright(chalk.bold("UPDATE")) + "] Starting auto-update"
    );

    let timeTookOnUpdate: number = 0;

    try {
      const configMiddleware = new ConfigMiddleware();

      const config = await configMiddleware.getCurrentConfig();

      const frontendDir = path.join(
        __dirname,
        "../../../../" + config.frontendFolderName
      );

      setInterval(() => {
        timeTookOnUpdate += 1;
      }, 100);

      executeCommand(frontendDir, "npm run auto-update-cms")
        .then(() => {
          console.log(
            "[" +
              chalk.yellowBright(chalk.bold("UPDATE")) +
              "] Auto-update successfuly finished in " +
              timeTookOnUpdate * 100 +
              "ms"
          );
          res.status(200).send(<BasicResponse>{
            type: "success",
            message: "Update finished",
            code: 200,
          });
        })
        .catch((err: any) => {
          console.error(`Error on updating : ${err}`);
          res.status(500).send(<BasicResponse>{
            type: "error",
            message: "Error on updating",
            code: 500,
          });
        });
    } catch (e) {
      console.log(e);
    }
  }
}

function executeCommand(cwd: string, command: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    exec(command, { cwd }, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error when executing command : ${err}`);
        console.log(stderr);
        reject(err);
      } else {
        console.log(stdout);

        resolve();
      }
    });
  });
}
