import mysql from "mysql2";

//create the connection to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123123",
  database: "videofilms",
});

export default db;
