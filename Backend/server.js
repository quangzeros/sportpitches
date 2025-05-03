const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/authRoute");
require("dotenv").config();

async function main() {
  await mongoose.connect(process.env.DB_CONNECT);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  main().catch((err) => console.log(err));
});
