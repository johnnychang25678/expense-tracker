const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const port = process.env.PORT
const routes = require('./routes/index')

// connect to mongodb
require('./config/mongoose')

// set up view engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    ifSelect: (a, b) => a === b ? 'selected' : null // for memorizing user selected input
  }
}))
app.set('view engine', 'handlebars')

// middlewares
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))
usePassport(app)

// routes
app.use(routes)

app.listen(port, () => console.log(`Express server is running on port: ${port}`))