const User = require("../../db/models/User")
const _ = require("../../services/util")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../../config/devconfig.json")

const {
  check
} = require("express-validator")

module.exports = {
  User: {
    register: (user) => {
      const BCRYPT_SALT_ROUNDS = 12
      return new Promise((resolve, reject) => {
        bcrypt.hash(user.password, BCRYPT_SALT_ROUNDS)
          .then(hash => {
            user.userID = _.getID()
            user.hash = hash
            user.online = true
            const newUser = new User(user)

            newUser.save((err, user) => {
              if (err) {
                reject(err)
              }

              resolve(user)
            })
          }).catch(err => {
            reject(err)
          })
      })
    },

    login: (obj) => {
      const query = {email: obj.user.email}
      const update = {online: true}
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate(query, update, {new: true, useFindAndModify: false}).then(doc => {
          resolve(bcrypt.compare(obj.user.password, obj.hash))
        })
      })
    },
    
    findByEmail: (email) => {
      return new Promise((resolve, reject) => {
        User.findOne({email: email}, (err, doc) => {
          if (err) {
            reject(err)
          }
          resolve(doc)
        })
      })
    },

    createToken: (userID) => {
      const tokenSecret = config.tokenSecret
      return jwt.sign({userID}, tokenSecret)
    },

    newUserValidator: [
      // username must be an email
      check("email", "email is not valid").isEmail(),
      // password must be at least 5 chars long
      check("password", "password must be at least 8 characters").isLength({
        min: 8
      }),
      check("confirmPassword", "passwords must be the same")
      .exists()
      .custom((value, {
        req
      }) => value === req.body.password)
    ],

    loginValidator: [
      check("email", "enter.valid.email").isEmail(),
      check("password", "password must be at least 8 characters").isLength({
        min: 8
      })
    ],

  }
}