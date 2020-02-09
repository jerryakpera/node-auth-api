const router = require("express").Router()
const USER = require("./userController").User
const verifyToken = require("../token/token").verify

router.post("/edit", verifyToken, (req, res) => {
  res.json({
    status: 200,
    message: "Profile edited successfully",
    data: req.user
  })
})

module.exports = router