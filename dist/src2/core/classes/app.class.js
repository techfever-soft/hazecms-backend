"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const config_1 = require("../../config");
const axios_1 = __importDefault(require("axios"));
class App {
    constructor() { }
    createAppInstance(newApp) {
        return new Promise((resolve, reject) => {
            axios_1.default
                .post(config_1.apiUrl + "app/createAppInstance", newApp)
                .then((res) => {
                console.log(res.data);
                resolve(res.data);
            })
                .catch((e) => {
                console.log(e);
                reject(e);
            });
        });
    }
}
exports.App = App;
