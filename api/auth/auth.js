const router = require("express").Router()
const AUTH = require("./authController").Auth
const TOKEN = require("../token/token")

const {
  validationResult
} = require('express-validator')

router.post("/test", (req, res) => {
  return res.json({
    status: "200",
    message: "It works!",
    data: {}
  })
})

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
    password: req.body.password
  }).then(user => {
    const token = TOKEN.createToken(user.userID)
    const expiresIn = TOKEN.getExpiresIn(token)
    TOKEN.createRefreshToken(user.userID).then(refreshToken => {
      res.header("access-token", token).json({
        status: 200,
        message: "User registered successfully",
        data: {
          "access-token": token,
          "refresh-token": refreshToken.token,
          expiresIn
        }
      })
    }).catch(err => {
      return res.json({
        status: 500,
        message: "Internal server error. Try again.",
        error: err.message,
        data: {}
      })
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
    AUTH.login({
      user: req.body,
      hash: user.hash
    }).then(status => {
      if (!status) {
        return res.json({
          status: 400,
          message: "Wrong details",
          data: {}
        })
      }

      const token = TOKEN.createToken(user.userID)
      const expiresIn = TOKEN.getExpiresIn(token)
      TOKEN.createRefreshToken(user.userID).then(refreshToken => {
        res.header("access-token", token).json({
          status: 200,
          message: "User logged in",
          data: {
            "access-token": token,
            "refresh-token": refreshToken.token,
            expiresIn
          }
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
  }).catch(err => {
    return res.json({
      status: 500,
      message: "Internal server error. Try again.",
      error: err.message,
      data: {}
    })
  })
})

router.post("/changepassword", AUTH.changePasswordValidator, TOKEN.verify, (req, res) => {
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
    if (!user) {
      return res.json({
        status: 400,
        message: "Incorrect details",
        data: {}
      })
    }

    AUTH.comparePasswords({
      one: req.body.currentPassword,
      two: user.hash
    }).then(password => {
      if (!password) {
        return res.json({
          status: 400,
          message: "Incorrect details",
          data: {}
        })
      }
      const newPassword = {
        newPassword: req.body.newPassword,
        userID: user.userID
      }
      AUTH.changePassword(newPassword).then(() => {
        return res.json({
          status: 200,
          message: "Password changed",
          data: {
            userID: user.userID
          }
        })
      }).catch(err => {
        return res.json({
          status: 500,
          message: err.message,
          data: {}
        })
      })
    })
  })
})

router.post("/refreshtoken", TOKEN.verify, (req, res) => {
  TOKEN.getID(req.header("access-token")).then(userID => {
    const refreshtoken = req.body.refreshToken

    TOKEN.findRefreshToken({
      userID,
      refreshtoken
    }).then(found => {
      if (!found) {
        return res.json({
          status: 400,
          message: "Incorrect token",
          data: {}
        })
      }

      const token = TOKEN.createToken(userID)
      const expiresIn = TOKEN.getExpiresIn(token)

      TOKEN.createRefreshToken(userID).then(refreshToken => {
        res.header("access-token", token).json({
          status: 200,
          message: "Token refreshed",
          data: {
            "access-token": token,
            "refresh-token": refreshToken.token,
            expiresIn
          }
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
  })
})

// Add functionality of sending confirmation email to users email to complete the process of changing email
router.post("/editemail", TOKEN.verify, (req, res) => {
  TOKEN.getID(req.header("access-token")).then(userID => {
    const query = {
      userID
    }

    AUTH.findByEmail(req.body.oldEmail).then(doc => {
      if (!doc) {
        return res.json({
          status: 400,
          message: "Wrong details",
          data: {}
        })
      }

      if (userID != doc.userID) {
        return res.json({
          status: 400,
          message: "Wrong details",
          data: {}
        })
      }
      AUTH.update(query, {
        email: req.body.newEmail
      }).then(user => {
        res.json({
          status: 200,
          message: "User edited",
          data: {
            userID: user.userID
          }
        })
      })

    }).catch(err => {
      return res.json({
        status: 500,
        message: err.message,
        data: {}
      })
    })
  })
})

router.post("/delete", TOKEN.verify, (req, res) => {
  TOKEN.getID(req.header("access-token")).then(userID => {
    const query = {
      userID
    }

    AUTH.findByEmail(req.body.email).then(doc => {
      if (!doc) {
        return res.json({
          status: 400,
          message: "Wrong details",
          data: {}
        })
      }

      if (userID != doc.userID) {
        return res.json({
          status: 400,
          message: "Wrong details",
          data: {}
        })
      }

      AUTH.delete({
        email: req.body.email
      }).then(() => {
        TOKEN.delete({
          userID
        }).then(() => {
          res.json({
            status: 200,
            message: "User deleted!",
            data: {}
          })
        }).catch(err => {
          return res.json({
            status: 500,
            message: err.message,
            data: {}
          })
        })
      }).catch(err => {
        return res.json({
          status: 500,
          message: err.message,
          data: {}
        })
      })

    }).catch(err => {
      return res.json({
        status: 500,
        message: err.message,
        data: {}
      })
    })
  })
})

router.post("/details", TOKEN.verify, (req, res) => {
  TOKEN.getID(req.header("access-token")).then(userID => {
    const query = {
      userID
    }

    AUTH.findByEmail(req.body.email).then(doc => {
      if (!doc) {
        return res.json({
          status: 400,
          message: "Wrong details",
          data: {}
        })
      }

      if (userID != doc.userID) {
        return res.json({
          status: 400,
          message: "Wrong details",
          data: {}
        })
      } else {
        return res.json({
          status: 200,
          message: "User auth details",
          data: {
            userID: doc.userID,
            email: doc.email,
            created: doc.created
          }
        })
      }
    }).catch(err => {
      if (err) {
        return res.json({
          status: 500,
          message: err.message,
          data: {}
        })
      }
    })
  }).catch(err => {
    return res.json({
      status: 500,
      message: err.message,
      data: {}
    })
  })
})


// router.post("/token", (req, res) => {
//   console.log("Request made!")
//   res.json({
//     "error_code": "00",
//     "error_desc": {
//       "token": "/49EVWtAjhdbD2nzJecMzw",
//       "expiry": "2020-02-22T09:54:46.057"
//     }
//   })
// })

// router.post("/submit", (req, res) => {
//   console.log("Submit request made!")
//   res.json({
//     "error_code": "00",
//     "error_desc": {
//       "ResponseCode": "0",
//       "ConversationID": "ws_CO_DMZ_282069133_27032019223530205",
//       "external_ref_number": "",
//       "ResponseDesc": "Success.Requestacceptedforprocessing",
//       "OriginatorConversationID": "B2C-SIT-000005",
//       "ServiceStatus": "0"
//     }
//   })
// })

module.exports = router