const express = require('express')
const router = express.Router()

router.use('/users', require('./modules/users'))
router.use('/expenses', require('./modules/expenses'))
router.use('/', require('./modules/home'))

module.exports = router