// Config
const currentEnv = require("./config/env.js").env
const config = require(`./config/${currentEnv}config.json`)
// Bring in app from app.js
const app = require("./app")

const port = process.env.PORT || config.port || 5000

app.listen(config.port, () => {
  console.log(`node-auth-api is currently listening on port ${config.port}`)
})