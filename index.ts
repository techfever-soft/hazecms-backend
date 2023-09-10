import express from "express";
import { routes } from "./routes";

const app = express();
const cors = require("cors")({ origin: "*" });
const bodyParser = require("body-parser");

app.use(express.json());

app.use(cors);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

const port = 3000;

app.listen(port, () => {
  console.log(`Client server listening on port ${port}`);
});
