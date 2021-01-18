const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const format = require('date-fns/format')

const filter = require('../../utils/filter') // mongodb query for filter function

router.get('/', (req, res) => {
  const userId = req.user._id
  const { month, category } = req.query
  const filters = filter(month, category)

  const recordData = Record.find({ userId, ...filters }).lean().sort({ date: 'desc' })
  const categoryData = Category.find().lean()

  Promise.all([categoryData, recordData])
    .then(([categories, records]) => {
      const icons = new Map(categories.map(category => [category.category_name, category.icon])) // generate category => icon map
      const sumAmount = records.reduce((a, record) => a + record.amount, 0)
      const formatTotalAmount = new Intl.NumberFormat('en-US').format(sumAmount)
      const formatRecords = records.map(record => {
        return {
          ...record,
          date: format(record.date, 'y/LL/dd'), // format date
          category: icons.get(record.category), // convert data to icon 
          amount: new Intl.NumberFormat('en-US').format(record.amount) // format amount
        }
      })
      res.render('index', {
        month,
        category,
        records: formatRecords,
        totalAmount: formatTotalAmount,
      })
    })
    .catch(err => console.log(err))
})


module.exports = router