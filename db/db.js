// COnfig
const config = require("../config/devconfig.json")
// Mongoose module
const mongoose = require('mongoose')

// Connect to DB with user and authentication
mongoose.connect(config.dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
// check for database errors
db.on('error', (err) => {
  console.log(err)
})
// If connected log connected to mongodb
db.once('open', () => {
  console.log('Connected to MongoDB')
})

module.exports = db