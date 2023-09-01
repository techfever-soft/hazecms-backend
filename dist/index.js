"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const cors = require("cors")({ origin: "*" });
const bodyParser = require("body-parser");
app.use(express_1.default.json());
app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", routes_1.routes);
const port = 3000;
app.listen(port, () => {
    console.log(`dataServer écoute sur le port ${port}`);
});
