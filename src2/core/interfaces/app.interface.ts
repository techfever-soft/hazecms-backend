export interface AppForm {
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
      adminsList: AppFormAdmin[];
    };
  }
  
  export interface AppFormAdmin {
    email: string;
    password: string;
  }
  