const dataBase = require("../../database/index.js");

const getAll = async (req, res, next) => {
  let classess = await dataBase.any(
    "SELECT * FROM classes WHERE school_ID = 1"
  );
  try {
    res.status(200).json({
      classess,
      status: "ok"
    });
  } catch (err) {
    next(error);
  }
};

const getByid = async (req, res, next) => {
  try {
    let classSelected = await dataBase.one(
      "SELECT * FROM classes WHERE id = $1 ",
      [req.params.id]
    );
    res.status(200).json({
      classSelected,
      status: "ok",
      message: "class selected"
    });
  } catch (err) {
    next(err);
  }
};

const addClass = async (req, res, next) => {
  console.log(req.body);
  try {
    let classAdded = await dataBase.one(
      "INSERT INTO classes (school_id,class_name,teacher_name) VALUES (1,${class_name}, ${teacher_name}) RETURNING *",
      req.body
    );
    res.status(200).json({
      classAdded,
      message: "new class created",
      status: "success"
    });
  } catch (err) {
    next(err);
  }
};

const deleteClass = async (req, res, next) => {
  try {
    await dataBase.none("DELETE from classes WHERE id = $1", [req.params.id]);
    res.status(200).json({
      status: "ok",
      message: "class Has Been Deleted"
    });
  } catch (err) {
    next(err);
  }
};

const getByidStudents = async (req, res, next) => {
  try {
    let classstudentSelected = await dataBase.any(
      "SELECT * FROM records FULL JOIN students ON students.id = records.student_id FULL JOIN classes on classes.id = records.class_id WHERE class_id = $1 ",
      [req.params.id]
    );
    res.status(200).json({
      classstudentSelected,
      status: "ok",
      message: "class selected"
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getByid,
  addClass,
  deleteClass,
  getByidStudents
};
