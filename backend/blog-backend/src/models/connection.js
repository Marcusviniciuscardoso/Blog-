require('dotenv').config()
const Pool = require('pg').Pool

const connection = new Pool({
  host: process.env.post_host,
  port: process.env.post_port,
  database: process.env.post_database,
  user: process.env.post_username,
  password: process.env.post_password
})

module.exports = connection
