const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

// @route GET /users/login
// @desc login form
// @access Public
router.get('/login', (req, res) => {
  res.render('login')
})

// @route GET /users/register
// @desc register form
// @access Public
router.get('/register', (req, res) => {
  res.render('register')
})

// @route POST /users/register
// @desc register 
// @access Public
router.post('/register', async (req, res) => {
  const { email, password, confirmPassword } = req.body
  const registerErrors = []

  if (!email || !password || !confirmPassword) {
    registerErrors.push({ message: '信箱、密碼、確認密碼欄位必填。' })
  }
  if (password !== confirmPassword) {
    registerErrors.push({ message: '密碼與確認密碼不符！' })
  }
  if (registerErrors.length) {
    return res.render('register', { registerErrors, email, password, confirmPassword })
  }

  const user = await User.findOne({ email })
  if (user) {
    console.log('User already exists')
  } else {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    await User.create({
      email,
      password: hash
    })
    return res.redirect('/')
  }

})

module.exports = router