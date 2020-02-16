const dataBase = require("../../database/index.js");

const getAll = async (req, res, next) => {
  try {
    let students = await dataBase.any("SELECT * FROM students");
    res.status(200).json({
      students,
      status: "ok"
    });
  } catch (err) {
    next(error);
  }
};

const getByID = async (req, res, next) => {
  try {
    let student = await dataBase.one("SELECT * FROM students WHERE id=$1 ", [
      req.params.id
    ]);
    res.status(200).json({
      student,
      status: "ok"
    });
  } catch (err) {
    next(error);
  }
};

const addStudent = async (req, res, next) => {
  try {
    let studentAdded = await dataBase.one(
      "INSERT INTO students (student_name,age,city) VALUES (${student_name}, ${age},${city}) RETURNING *",
      req.body
    );
    await dataBase.none(
      `INSERT INTO records (student_id,class_id,grade) VALUES (${studentAdded.id}, ${req.body.class_id},  ${req.body.grade}) `
    );

    res.status(200).json({
      studentAdded,
      status: "ok"
    });
  } catch (err) {
    next(error);
  }
};

const deleteStudent = async (req, res, next) => {
  await dataBase.none("DELETE FROM students WHERE id=$1 ", [req.params.id]);
  try {
    res.status(200).json({
      status: "student deleted"
    });
  } catch (err) {
    next(error);
  }
};

module.exports = {
  getAll,
  getByID,
  addStudent,
  deleteStudent
};
