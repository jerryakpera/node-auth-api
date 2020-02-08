// Create express app
const express = require("express")
const app = express()

// Routes
const authRoute = require("./routes/auth")
app.use("/v1/api/user", authRoute)


module.exports = app