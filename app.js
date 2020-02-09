// Create express app
const express = require("express")
const app = express()

// Body parser middleware
const bodyParser = require("body-parser")
app.use(express.json())
// Routes
const authRoute = require("./api/auth/auth")
app.use("/v1/api/auth", authRoute)

const userRoute = require("./api/user/user")
app.use("/v1/api/user", userRoute)

module.exports = app