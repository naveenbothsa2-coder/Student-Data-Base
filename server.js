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
//students.js
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  Student_name: {
    type: String,
    required: true
  },

  Age: {
    type: Number,
    required: true
  },

  Course: {
    type: String,
    required: true
  },

  Email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Student", studentSchema);
//studentroutes.js
const express = require("express");
const router = express.Router();

const Student = require("../models/students");

// CREATE Student
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET All Students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET Single Student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE Student
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE Student
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    if (!deletedStudent) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    res.json({
      message: "Student deleted successfully"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
