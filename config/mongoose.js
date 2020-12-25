const mongoose = require('mongoose')
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/expense-tracker'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => console.log('mogodb error'))
db.once('open', () => console.log('mongodb connected!'))

module.exports = db