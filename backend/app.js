const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const classRouter = require("./routes/class/classroutes.js");
const studentRouter = require("./routes/student/student");

const port = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/class", classRouter);
app.use("/students", studentRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json(err);
});

app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
