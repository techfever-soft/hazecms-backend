import { AppForm } from "../interfaces/app.interface";
import { apiUrl } from "../../config";
import axios from "axios";

export class App {
  constructor() {}

  public createAppInstance(newApp: AppForm) {
    return new Promise((resolve, reject) => {
        axios
      .post(apiUrl + "app/createAppInstance", newApp)
      .then((res) => {
        console.log(res.data);
        resolve(res.data)
      })
      .catch((e) => {
        console.log(e);
        reject(e)
      });
    })
  }
}
