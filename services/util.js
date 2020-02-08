const uniqid = require("uniqid")

module.exports = {
  getID: () => {
    return uniqid()
  }
}