const express = require('express')
const router = express.Router()
const authenticator = require('../middleware/auth')

router.use('/users', require('./modules/users'))
router.use('/auth', require('./modules/auth'))
router.use('/expenses', authenticator, require('./modules/expenses'))
router.use('/', authenticator, require('./modules/home'))

module.exports = router