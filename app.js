const express = require ('express')
const app = express()
const morgan = require("morgan")
const database = require( './src/Database/Database')
const routes = require('./src/Routes/Routes')




// Middleware for parsing JSON
app.use(express.json())
// Middleware for logging
app.use(morgan("dev"))

// Connect to MongoDB
database()

// Routes
app.use(routes)







module.exports = app