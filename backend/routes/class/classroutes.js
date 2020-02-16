const classesroute = require("express").Router();
const {
  getAll,
  getByid,
  addClass,
  deleteClass,
  getByidStudents
} = require("../../queries/class/classQueries");

classesroute.get("/", getAll);

classesroute.get("/:id", getByid);

classesroute.post("/", addClass);

classesroute.delete("/:id", deleteClass);
classesroute.get("/:id/students", getByidStudents);

module.exports = classesroute;
