const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("It works!!");
});

module.exports = app;