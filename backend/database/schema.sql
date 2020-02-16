DROP DATABASE IF EXISTS school_db;
CREATE DATABASE school_db;

\c school_db;

DROP TABLE IF EXISTS schools;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS records;



CREATE TABLE schools
(
      id SERIAL PRIMARY KEY,
      school_name Text
);


CREATE TABLE classes
(
      id SERIAL PRIMARY KEY,
      school_id INT REFERENCES schools(id) ON DELETE CASCADE,
      class_name Text,
      teacher_name Text
);


CREATE TABLE students
(
      id SERIAL PRIMARY KEY,
      student_name VARCHAR,
      age INT,
      city TEXT,
      created DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE records
(
      id SERIAL PRIMARY KEY,
      student_id INT REFERENCES students(id) ON DELETE CASCADE,
      class_id INT REFERENCES classes(id) ON DELETE CASCADE,
      grade INT,
      dt DATE NOT NULL DEFAULT CURRENT_TIMESTAMP

);

INSERT INTO schools
      (school_name)
VALUES
      ('School of Hardknockz');

INSERT INTO classes
      (school_id,class_name, teacher_name)
VALUES
      (1, 'Physics', 'Henry Roman');

INSERT INTO students
      (student_name, age, city)
VALUES
      ('John', 30, 'NYC');



INSERT INTO records
      (student_id,class_id,grade)
VALUES
      (1, 1, 75);