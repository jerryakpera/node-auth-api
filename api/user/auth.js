const router = require("express").Router()
const USER = require("./userController").User

const {
  validationResult
} = require('express-validator')

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
      data: {
        userID: user.userID
      }
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

router.post("/login", USER.loginValidator, (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      status: 400,
      message: "Request is incorrect",
      errors: errors.array(),
      data: {}
    })
  }

  USER.findByEmail(req.body.email).then(user => {
    // If no user with that email is found
    if (!user) {
      return res.json({
        status: 400,
        message: "User does not exist",
        data: {}
      })
    }

    // If user is found then update the user online status to true and login the user
    USER.login({user: req.body, hash: user.hash}).then(status => {
      if (!status) {
        return res.json({
          status: 400,
          message: "Wrong password",
          data: {}
        })
      }
      return res.json({
        status: 200,
        message: "User logged in successfully",
        data: {
          userID: user.userID
        }
      })
    })
  }).catch(err => {
    return res.json({
      status: 500,
      message: "Internal server error. Try again.",
      error: err.message,
      data: {}
    })
  })
})

module.exports = router