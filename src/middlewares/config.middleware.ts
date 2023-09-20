import fs from "fs";
import path from "path";

const configPath = path.join(__dirname, "../../../config.json");

export class ConfigMiddleware {

  /**
   * Gets the config.json file
   * @returns Promise<any>
   */
  public getCurrentConfig(): Promise<any> {
    return new Promise((resolve, reject) => {
      fs.readFile(configPath, "utf8", async (err: any, data: any) => {
        const jsonData = JSON.parse(data);
        resolve(jsonData);
      });
    });
  }
}
