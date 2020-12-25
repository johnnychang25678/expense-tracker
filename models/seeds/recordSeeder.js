const db = require('../../config/mongoose')
const Record = require('../record')

db.once('open', () => {
  console.log('mongodb connected')
  Record.create(
    {
      name: '午餐',
      category: 'food',
      date: new Date('2020-11-11'),
      amount: 120
    },
    {
      name: '捷運',
      category: 'traffic',
      date: new Date('2020-12-23'),
      amount: 60
    },
    {
      name: '唱歌',
      category: 'entertainment',
      date: new Date('2020-10-23'),
      amount: 750
    },
    {
      name: '房租',
      category: 'home',
      date: new Date('2020-09-07'),
      amount: 15000
    },
  )
  console.log('seed data created in mongodb')
})