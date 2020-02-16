const studentRoute = require("express").Router();
const {
  getAll,
  getByID,
  addStudent,
  deleteStudent
} = require("../../queries/student/student");

studentRoute.get("/", getAll);

studentRoute.get("/:id", getByID);

studentRoute.post("/", addStudent);

studentRoute.delete("/:id", deleteStudent);

module.exports = studentRoute;
