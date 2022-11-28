const mongoose = require("mongoose");

const { DB_CONNECT_URI } = process.env;

mongoose.connect(DB_CONNECT_URI);
