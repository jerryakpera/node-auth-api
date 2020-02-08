const User = require("../../db/models/User")
const _ = require("../../services/util")
const bcrypt = require("bcryptjs")

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
    ]
  }
}