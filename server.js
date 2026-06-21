const express = require("express");
const mongoose = require("mongoose");

const studentRoutes = require("./routes/studentroutes");

const app = express();

app.use(express.json());

app.use("/students", studentRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/studentDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Student Management API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});