const mongoose = require("mongoose")
var uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  hash: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema)