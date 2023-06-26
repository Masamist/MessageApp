const mysql = require("mysql2")

const pool = mysql.createPool({
  host:"testdb.ctlebsfg7fei.us-east-1.rds.amazonaws.com",
  user: "admin",
  database: "testdb",
  password:"testinghello333"
})

module.exports = pool