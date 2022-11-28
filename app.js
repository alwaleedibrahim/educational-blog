const express = require("express");
const cors = require("cors");
const router = require("./routers/user");

require("dotenv").config();

require("./db/db_connect");

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.status(200).send("It works!!");
});

module.exports = app;
