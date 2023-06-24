const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mysql = require("mysql2")
const cors = require("cors")

const db = mysql.createPool({
  host:"testdb.ctlebsfg7fei.us-east-1.rds.amazonaws.com",
  user: "admin",
  database: "testdb",
  password:"testinghello333"
})

// Local MySQL connection
// const db = mysql.createPool({
//   host:"localhost",
//   user: "root",
//   database: "private_flight",
//   password:"test@2023#"
// })

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/get", (req, res) => {
  const sqlGet = "SELECT * FROM messages"
  db.query(sqlGet, (error, result) => {
    res.send(result)
  })
})

app.get("/api/get/:id", (req, res) => {
  const { id } = req.params
  const sqlGet = "SELECT * FROM messages WHERE id = ?"
  db.query(sqlGet, id, (error, result) => {
    if(error) {
      console.log(error)
    }
    res.send(result)
  })
})

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params
  const { admin_title, country_code, text_message, start_date, end_date } = req.body
  const sqlUpdate = 
  "UPDATE messages SET admin_title = ?, country_code = ?, text_message = ?, start_date = ?, end_date = ?  WHERE id = ?"
  db.query(sqlUpdate, [admin_title, country_code, text_message, start_date, end_date, id], (error, result) => {
    if(error) {
      console.log(error)
    }
    res.send(result)
  })
})

app.post("/api/post", (req, res) => {
  const { admin_title, country_code, text_message, start_date, end_date } = req.body
  const sqlInsert = 
  "INSERT INTO messages (admin_title, country_code, text_message, start_date, end_date) VALUES (?,?,?,?,?)"
  db.query(sqlInsert, [admin_title, country_code, text_message, start_date, end_date], (error, result) => {
    if(error){
      console.log(error)
    }
  }) 
})

app.delete("/api/remove/:id", (req, res) => {
  const { id } = req.params
  const sqlRemove = 
  "DELETE FROM messages WHERE id = ?"
  db.query(sqlRemove, id, (error, result) => {
    if(error){
      console.log(error)
    }
  }) 
})

app.listen(5000, () => {
  console.log("Server is runnning on port 5000")
})