// Create express app
const express = require("express")
const app = express()

app.use(express.json())

// ******************* SWAGGER MIDDLEWARE *******************
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require("./public/swagger/swagger_config")
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})
// Swagger route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use("/", (req, res, next) => {
  console.log(req.body)
  next()
})

const baseURL = "/api/v1"

// Routes
const authRoute = require("./api/auth/auth")
app.use(`${baseURL}/auth`, authRoute)

// ERROR Middleware
// Handles routes that are not handled by our application
app.use((req, res, next) => {
  const err = new Error("Not found!")
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    }
  })
})

module.exports = app