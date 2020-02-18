// Config
const currentEnv = require("./config/env.js").env
const config = require(`./config/${currentEnv}config.json`)
// Bring in app from app.js
const app = require("./app")
// DB connection
const db = require("./db/db")

app.listen(config.port, () => {
  console.log(`node-auth-api is currently listening on port ${config.port}`)
})