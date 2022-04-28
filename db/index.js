const mysql = require("mysql2")
const fs = require("fs")
const bcrypt = require("bcryptjs")

// Load config variables
const config = require("../app/config/db.config");

// Connect to database
const connection = mysql.createConnection({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB,
  multipleStatements: true, // IMPORTANT
})

connection.connect()

console.log("Running SQL seed...")

// Generate random password for initial admin user
const hash = bcrypt.hashSync('admin', 8)

const seedQuery = `INSERT INTO users (username, email, password, roleId) VALUES ('admin', 'admin@gmail.com', '${hash}', 2); `

// Run seed query
connection.query(seedQuery, err => {
  if (err) {
    throw err
  }

  console.log("SQL seed completed! Password for initial admin account: " + 'admin')
  connection.end()
})