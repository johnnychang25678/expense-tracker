const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const format = require('date-fns/format')


// @route GET /expenses/new
// @desc Form for an add new expense
// @access Private
router.get('/new', (req, res) => {
  res.render('new')
})

// @route POST /expenses
// @desc Add a new expense
// @access Private
router.post('/', (req, res) => {
  const userId = req.user._id
  const data = req.body
  return Record.create({ ...data, userId })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))

})

// @route GET /expenses/:id/edit
// @desc Form for edit expense
// @access Private
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  Record.findOne({ _id, userId }).lean()
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
// @access Private
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => {
      record = Object.assign(record, req.body)
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

// @route DELETE /expenses/:id
// @desc delete an expense
// @access Private
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Record.findOne({ _id, userId })
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})


module.exports = router