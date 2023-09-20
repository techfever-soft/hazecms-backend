import fs from "fs";
import path from "path";

const configPath = path.join(__dirname, "../../../config.json");

export class DatabaseMiddleware {
  private currentDatabaseConfig: any;

  /**
   * Reads the config file
   * @param filePath string
   * @returns Promise<string>
   */
  private readFileAsync(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err: any, data: string) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Gets the current database from the config
   * @returns Promise<{databaseType: string, databaseName: string}>
   */
  public async getCurrentDatabase(): Promise<{
    databaseType: string;
    databaseName: string;
  }> {
    try {
      const data = await this.readFileAsync(configPath);
      const jsonData = JSON.parse(data);

      this.currentDatabaseConfig = jsonData.database;

      switch (this.currentDatabaseConfig.databaseType) {
        case "mysql":
          return {
            databaseType: this.currentDatabaseConfig.databaseType,
            databaseName: this.currentDatabaseConfig.database,
          };

        default:
          throw new Error("Unsupported database type");
      }
    } catch (error) {
      throw error;
    }
  }

  /**
   * Initializes the database of a service
   * @param service any
   * @returns Promise<any>
   */
  public initDatabaseWithService(service: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let databaseService;

      switch (this.currentDatabaseConfig.databaseType) {
        case "mysql":
          databaseService = new service(
            this.currentDatabaseConfig.host,
            this.currentDatabaseConfig.username,
            this.currentDatabaseConfig.password,
            this.currentDatabaseConfig.port
          );

          break;
      }

      resolve(databaseService);
    });
  }
}
