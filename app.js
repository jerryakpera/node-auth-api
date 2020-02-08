// Create express app
const express = require("express")
const app = express()

// Body parser middleware
const bodyParser = require("body-parser")
app.use(express.json())
// Routes
const authRoute = require("./api/user/auth")
app.use("/v1/api/user", authRoute)

module.exports = app