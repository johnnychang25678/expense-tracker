const express = require('express')
const router = express.Router()

// @route GET /expenses/new
// @desc Form for an add new expense
// @access Public
router.get('/new', (req, res) => {
  res.render('new')
})

// @route POST /expenses
// @desc Add a new expense
// @access Public
router.post('/', (req, res) => {
  console.log('post to /expenses')
  res.redirect('/')
})

// @route GET /expenses/:id/edit
// @desc From for edit expense
// @access Public
router.get('/:id/edit', (req, res) => {
  console.log('get to /:id/edit')
  res.render('edit')
})

// @route PUT /expenses/:id
// @desc edit an expense
// @access Public
router.put('/:id', (req, res) => {
  console.log('put to /:id')
  res.redirect('/')
})

// @route DELETE /expenses/:id
// @desc delete an expense
// @access Public
router.delete('/:id', (req, res) => {
  console.log('delete to /:id')
  res.redirect('/')
})


module.exports = router