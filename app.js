// Create express app
const express = require("express")
const app = express()

app.use(express.json())
// Routes
const authRoute = require("./api/auth/auth")
app.use("/v1/api/auth", authRoute)

module.exports = app