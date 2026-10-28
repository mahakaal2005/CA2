require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bookRoutes = require("./Routes/bookRoutes");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("database connected");
  })
  .catch((error) => {
    console.log("Database is down", error);
  });

app.use(express.json());
app.use("/api/books", bookRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
