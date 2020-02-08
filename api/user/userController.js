const User = require("../../db/models/User")
const {
  check,
  validationResult
} = require("express-validator")

module.exports = {
  User: {
    register: (user) => {
      const newUser = new User(user)
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