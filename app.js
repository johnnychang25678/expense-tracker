const express = require('express')
const exphbs = require('express-handlebars')

const app = express()
const port = process.env.PORT || 3000

// connect to mongodb
require('./config/mongoose')

// set up view engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// middlewares
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

// routes
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => console.log(`Express server is running on port: ${port}`))