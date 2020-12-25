const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const format = require('date-fns/format')
const categoryToIcon = require('../../utils/categoryToIcon')

router.get('/', (req, res) => {
  let filter
  if (!req.query.filter || req.query.filter === 'all') {
    filter = null
  } else {
    filter = { category: req.query.filter }
  }

  Record.find(filter).lean()
    .then(records => {
      const sumAmount = records.reduce((a, record) => a + record.amount, 0)
      const formatTotalAmount = new Intl.NumberFormat('en-US').format(sumAmount)

      const formatRecords = records.map(record => {
        return {
          ...record,
          date: format(record.date, 'y/LL/dd'), // format date
          category: categoryToIcon(record.category), // convert data to icon
          amount: new Intl.NumberFormat('en-US').format(record.amount) // format amount
        }
      })

      res.render('index', { records: formatRecords, totalAmount: formatTotalAmount, filter })
    })
    .catch(err => console.error(err))

})

module.exports = router