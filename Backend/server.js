const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

async function main() {
  await mongoose.connect(process.env.DB_CONNECT);
}

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  main().catch((err) => console.log(err));
});
