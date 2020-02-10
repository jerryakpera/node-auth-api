const User = require("../../db/models/User")
const _ = require("../../services/util")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../../config/devconfig.json")

const {
  check
} = require("express-validator")

module.exports = {
  Auth: {
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

    login: (obj) => {
      return new Promise((resolve, reject) => {
        resolve(bcrypt.compare(obj.user.password, obj.hash))
      })
    },

    delete: (query) => {
      return new Promise((resolve, reject) => {
        User.deleteOne(query, (err, docs) => {
          if (err) reject(err)
          resolve()
        })
      })
    },

    update: (query, user) => {
      return new Promise((resolve, reject) => {
        User.findOneAndUpdate(query, user, {
          new: true,
          useFindAndModify: false
        }, (err, docs) => {
          if (err) reject(err)
          resolve(docs)
        })
      })
    },

    comparePasswords: (password) => {
      return new Promise((resolve, reject) => {
        resolve(bcrypt.compare(password.one, password.two))
      })
    },

    changePassword: (obj) => {
      const query = {userID: obj.userID}
      const BCRYPT_SALT_ROUNDS = 12
      return new Promise((resolve, reject) => {

        bcrypt.hash(obj.newPassword, BCRYPT_SALT_ROUNDS).then(hash => {
          User.findOneAndUpdate(query, {hash}, {new: true, useFindAndModify: false}, (err, docs) => {
            if (err) {
              reject(err)
            }
            resolve(docs)
          })
        })
      })
    },
    
    findByuserID: (userID) => {
      return new Promise((resolve, reject) => {
        User.findOne({userID: userID}, (err, doc) => {
          if (err) {
            reject(err)
          }
          resolve(doc)
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

    changePasswordValidator: [
      // username must be an email
      check("email", "email is not valid").isEmail(),
      // password must be at least 5 chars long
      check("currentPassword", "password must be at least 8 characters").isLength({
        min: 8
      }),
      check("newPassword", "password must be at least 8 characters").isLength({
        min: 8
      }),
      check("confirmNewPassword", "passwords must be the same")
      .exists()
      .custom((value, {
        req
      }) => value === req.body.newPassword),
      check("newPassword", "old and new passwords must be different")
      .exists()
      .custom((value, {
        req
      }) => value !== req.body.currentPassword)
    ],


  }
}