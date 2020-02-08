const router = require("express").Router()
const USER = require("./userController").User

const { validationResult } = require('express-validator')

router.post("/register", USER.newUserValidator, (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      status: 400,
      message: "Request is incorrect",
      errors: errors.array(),
      data: {}
    })
  }

  USER.register({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  }).then(user => {
    return res.json({
      status: 200,
      message: "User registered successfully",
      data: {userID: user.userID}
    })
  }).catch(err => {
    if (err) {
      return res.json({
        status: 500,
        message: "Internal server error. Try again.",
        error: err.message,
        data: {}
      })
    }
  })
})

router.post("/login", (req, res) => {
  res.send("Login user")
})

module.exports = router