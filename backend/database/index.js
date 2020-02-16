const pgp = require("pg-promise")({});
const dataBase = pgp("postgress://localhost:5432/school_db");

module.exports = dataBase;
