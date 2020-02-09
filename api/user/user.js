const router = require("express").Router()
const USER = require("./userController").User
const TOKEN = require("../token/token")

router.post("/editemail", TOKEN.verify, (req, res) => {
  TOKEN.getID(req.header("access-token")).then(userID => {
    const query = {
      userID
    }
    USER.update(query, req.body).then(user => {
      res.json({
        status: 200,
        message: "Profile edited",
        data: {
          userID: user.userID
        }
      })
    })
  })
})

module.exports = router