const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const format = require('date-fns/format')


router.get('/', (req, res) => {
  const categoryData = Category.find().lean()

  let filter
  if (!req.query.filter || req.query.filter === 'all') {
    filter = null
  } else {
    filter = { category: req.query.filter }
  }

  const recordData = Record.find(filter).lean().sort({ date: 'desc' })

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
        filter,
        records: formatRecords,
        totalAmount: formatTotalAmount,
      })
    })
    .catch(err => console.log(err))
})



// router.get('/', async (req, res) => {
//   try {
//     const categories = await Category.find().lean()
//     const icons = new Map(categories.map(category => [category.category_name, category.icon])) // generate category => icon map

// let filter
// if (!req.query.filter || req.query.filter === 'all') {
//   filter = null
// } else {
//   filter = { category: req.query.filter }
// }

//     const records = await Record.find(filter).lean().sort({ date: 'desc' })
// const sumAmount = records.reduce((a, record) => a + record.amount, 0)
// const formatTotalAmount = new Intl.NumberFormat('en-US').format(sumAmount)
// const formatRecords = records.map(record => {
//   return {
//     ...record,
//     date: format(record.date, 'y/LL/dd'), // format date
//     category: icons.get(record.category), // convert data to icon 
//     amount: new Intl.NumberFormat('en-US').format(record.amount) // format amount
//   }
// })

// res.render('index', {
//   filter,
//   records: formatRecords,
//   totalAmount: formatTotalAmount,
// })

//   } catch (err) {
//     console.error(err)
//   }

// })

module.exports = router