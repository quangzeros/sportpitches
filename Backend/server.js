const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoute");
require("dotenv").config();

async function main() {
  // const options = {
  //   serverSelectionTimeoutMS: 5000,
  //   socketTimeoutMS: 45000,
  //   // Tắt tính năng DNS SRV để tránh lỗi querySrv
  //   directConnection: true,
  // };
  await mongoose.connect(process.env.DB_CONNECT);
  console.log("Connected to MongoDB Successfully!");
}
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  main().catch((err) => console.log(err));
});
