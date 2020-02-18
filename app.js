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

const baseURL = "/api/v1"

// Routes
const authRoute = require("./api/auth/auth")
app.use(`${baseURL}/auth`, authRoute)

module.exports = app