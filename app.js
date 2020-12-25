const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes/index')

// connect to mongodb
require('./config/mongoose')

// set up view engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  helpers: {
    ifSelect: (a, b) => a === b ? 'selected' : null
  }
}))
app.set('view engine', 'handlebars')

// middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(methodOverride('_method'))

// routes
app.use(routes)

app.listen(port, () => console.log(`Express server is running on port: ${port}`))