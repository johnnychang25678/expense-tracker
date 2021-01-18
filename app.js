const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
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
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.successMessage = req.flash('successMessage')
  res.locals.warningMessage = req.flash('warningMessage')
  res.locals.errorMessage = req.flash('error') // from passport
  next()
})

// routes
app.use(routes)

app.listen(port, () => console.log(`Express server is running on port: ${port}`))