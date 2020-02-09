const User = require("../../db/models/User")
const _ = require("../../services/util")
const config = require("../../config/devconfig.json")

module.exports = {
  User: {
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
    }
  }
}