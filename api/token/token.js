const jwt = require("jsonwebtoken")
const config = require("../../config/devconfig.json")
const AUTH = require("../auth/authController").Auth
const RefreshToken = require("../../db/models/RefreshToken")
const _ = require("../../services/util")


module.exports = {
  createToken: (userID) => {
    const tokenSecret = config.tokenSecret
    return jwt.sign({userID}, tokenSecret, {
      expiresIn: config.jwtExpirySeconds
    })
  },

  createRefreshToken: (userID) => {
    const refreshTokenSecret = config.refreshTokenSecret
    const now = new Date()

    return new Promise((resolve, reject) => {
      // RefreshToken
      const refreshToken = {
        userID,
        token: jwt.sign({userID}, refreshTokenSecret),
        expiresIn: now.setDate(now.getDate() + config.refreshTokenExpiresIn)
      }
      RefreshToken.findOneAndUpdate({userID}, refreshToken, {
        new: true,
        useFindAndModify: false,
        upsert: true
      }, (err, newRefreshToken) => {
        if (err) {
          reject(err)
        }
        resolve(newRefreshToken)
      })
    })
  },

  getExpiresIn: (token) => {
    return jwt.verify(token, config.tokenSecret).exp
  },

  verify: (req, res, next) => {
    const token = req.header("access-token")
    if (!token) {
      return res.json({
        status: 401,
        message: "Access denied",
        data: {}
      })
    }

    try {
      const verified = jwt.verify(token, config.tokenSecret)
      AUTH.findByuserID(verified.userID).then(user => {
        if (!user) {
          return res.json({
            status: 401,
            message: "Access denied",
            data: {}
          })
        }
        req.user = verified
        next()
      })

    } catch (err) {
      res.json({
        status: 400,
        message: "Invalid token",
        data: {}
      })
    }
  },

  getID: (token) => {
    const verified = jwt.verify(token, config.tokenSecret)

    return new Promise((resolve, reject) => {
      resolve(verified.userID)
    })
  },

  findRefreshToken: (token) => {
    return new Promise((resolve, reject) => {
      RefreshToken.findOne({userID: token.userID}, (err, refreshToken) => {
        if (err) reject(err)

        if (token.refreshtoken == refreshToken.token) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }
}