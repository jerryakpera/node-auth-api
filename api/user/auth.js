const router = require("express").Router()
const USER = require("./userController").User

const { validationResult } = require('express-validator')

router.post("/register", USER.newUserValidator, (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.json({
      status: 200,
      message: "Request is incorrect",
      errors: errors.array(),
      data: {}
    })
  }
  
  USER.register(req.body)
  res.send("Register user")
})

router.post("/login", (req, res) => {
  res.send("Login user")
})

module.exports = router