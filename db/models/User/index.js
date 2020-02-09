const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true
  },
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
  created: {
    type: Date,
    default: Date.now
  },
  online: {
    type: Boolean,
    required: true,
    default: false
  }
}, { versionKey: false })

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema)