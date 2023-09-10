export interface AppInstallForm {
  activation: {
    apiKey: string;
  };
  database: {
    databaseType: string;
    host: string;
    username: string;
    password: string;
    database: string;
    port: number;
  };
  config: {
    language: string;
    timezone: string;
    adminsList: AppInstallFormAdmin[];
  };
}

export interface AppInstallFormAdmin {
  email: string;
  password: string;
}
