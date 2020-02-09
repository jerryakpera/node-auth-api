const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')

const refreshTokenSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  expiresIn: {
    type: Date,
    required: true
  }
}, { versionKey: false })

refreshTokenSchema.plugin(uniqueValidator)

module.exports = mongoose.model("RefreshToken", refreshTokenSchema)