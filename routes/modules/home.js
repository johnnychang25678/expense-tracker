const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const format = require('date-fns/format')
const categoryToIcon = require('../../utils/categoryToIcon')


router.get('/', (req, res) => {
  Record.find().lean()
    .then(records => {
      const formatRecords = records.map(record => {
        return {
          ...record,
          date: format(record.date, 'y/LL/dd'), // format date
          category: categoryToIcon(record.category) // convert data to icon
        }
      })
      res.render('index', { records: formatRecords })
    })
    .catch(err => console.error(err))

})

module.exports = router