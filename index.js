// Import
const express = require('express')
const app = express()
const path = require('path')
const hbs = require('hbs')

require('dotenv').config()

const connectDB = require('./config/db')

const sessionManager = require("./config/session")

// Midlewares
// Stitic Files HTML, CSS, IMAGES
app.use(express.static(path.join(__dirname, 'public')))

// View enige
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// To use partial views
hbs.registerPartials(__dirname + "/views/partials")

// To use req.body insted to use the module body-parser 
app.use(express.urlencoded({ extended: true }))

// Connect to DB
connectDB()

// Session
sessionManager(app)

// Routes
// Layot middleware
app.use((req, res, next) => {
    res.locals.currentUser = req.session.currentUser
    next()
})

app.use('/', require('./routes/index'))

app.use('/users', require('./routes/users'))

app.use('/auth', require('./routes/auth'))

// Server
app.listen(process.env.PORT, () => {
    console.log(`Listen on http://localhost:${process.env.PORT}`)
})