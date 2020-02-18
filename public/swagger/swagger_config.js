const swaggerJSDoc = require('swagger-jsdoc')

// Swagger Definition
const swaggerDefinition = require('./swaggerDefinition').swaggerDefinition

const options = {
  swaggerDefinition,
  apis: ['../../routes/*.js']
}
const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec
