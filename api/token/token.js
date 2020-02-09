const jwt = require("jsonwebtoken")
const config = require("../../config/devconfig.json")

module.exports = {
  verify: (req, res, next) => {
    const token = req.header("auth-token")
    if (!token) {
      return res.json({
        status: 401,
        message: "Access denied",
        data: {}
      })
    }

    try {
      const verified = jwt.verify(token, config.tokenSecret)
      req.user = verified
      next()
    } catch (err) {
      res.json({
        status: 400,
        message: "Invalid token",
        data: {}
      })
    }
  }
}