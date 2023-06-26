const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")

const messageRouter = require('./routes/messageRoutes')


// Middlewares
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// app.use((req, res, next) => {
//   console.log('This is Middleware')
//   next()
// })

// Routes
app.use('/api/messages', messageRouter)

module.exports = app