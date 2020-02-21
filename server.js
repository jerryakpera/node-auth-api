// Config
const currentEnv = require("./config/env.js").env
const config = require(`./config/${currentEnv}config.json`)
// Bring in app from app.js
const app = require("./app")

const port = process.env.PORT || 5000 || config.port
const db = require("./db/db")

app.listen(port, () => {
  console.log(`node-auth-api is currently listening on port ${port}`)
})