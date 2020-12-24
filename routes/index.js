const express = require('express')
const router = express.Router()

router.use('/', require('./modules/home'))
router.use('/expenses', require('./modules/expenses'))

module.exports = router