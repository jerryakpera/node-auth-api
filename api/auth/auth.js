const router = require("express").Router()
const AUTH = require("./authController").User

const {
  validationResult
} = require('express-validator')

router.post("/register", AUTH.newUserValidator, (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      status: 400,
      message: "Request is incorrect",
      errors: errors.array(),
      data: {}
    })
  }

  AUTH.register({
    email: req.body.email,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  }).then(user => {
    const token = AUTH.createToken(user.userID)
    res.header("auth-token", token).json({
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

router.post("/login", AUTH.loginValidator, (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      status: 400,
      message: "Request is incorrect",
      errors: errors.array(),
      data: {}
    })
  }

  AUTH.findByEmail(req.body.email).then(user => {
    // If no user with that email is found
    if (!user) {
      return res.json({
        status: 400,
        message: "User does not exist",
        data: {}
      })
    }

    // If user is found then update the user online status to true and login the user
    AUTH.login({user: req.body, hash: user.hash}).then(status => {
      if (!status) {
        return res.json({
          status: 400,
          message: "Wrong password",
          data: {}
        })
      }

      const token = AUTH.createToken(user.userID)
      res.header("auth-token", token).json({
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