// Config
const currentEnv = require("../../../config/env").env
const config = require(`../../../config/${currentEnv}config.json`)

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
  }
}, {
  versionKey: false,
  timestamps: true
})

const refreshTokenExpiresAfter = config.jwtExpirySeconds + 60
refreshTokenSchema.index({"createdAt": 1}, {expiresAfterSeconds: refreshTokenExpiresAfter})

refreshTokenSchema.plugin(uniqueValidator)

module.exports = mongoose.model("RefreshToken", refreshTokenSchema)