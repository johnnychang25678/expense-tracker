const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const format = require('date-fns/format')


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
  const data = req.body
  return Record.create({ ...data })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))

})

// @route GET /expenses/:id/edit
// @desc From for edit expense
// @access Public
router.get('/:id/edit', (req, res) => {
  console.log(req.params)
  const id = req.params.id
  Record.findById(id).lean()
    .then(record => {
      const formatRecord = {
        ...record,
        date: format(record.date, 'y-LL-dd')
      }
      return res.render('edit', { record: formatRecord })
    })
    .catch(err => console.error(err))
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