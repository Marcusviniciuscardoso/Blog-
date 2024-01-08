require('dotenv').config()
const Pool = require('pg').Pool

const connection = new Pool({
  host: process.env.post_host,
  port: process.env.post_port,
  database: process.env.post_database,
  user: process.env.post_username,
  password: process.env.post_password
})

console.log('Host:', connection.options.host)
console.log('Port:', connection.options.port)
console.log('Database:', connection.options.database)
console.log('User:', connection.options.user)
console.log('Password:', connection.options.password)

module.exports = connection
