const db = require('../../config/mongoose')
const Category = require('../category')

db.once('open', () => {
  console.log('mongodb connected')
  Category.create(
    {
      category_name: 'home',
      icon: 'fas fa-home',
    },
    {
      category_name: 'traffic',
      icon: 'fas fa-shuttle-van',
    },
    {
      category_name: 'entertainment',
      icon: 'fas fa-grin-beam',
    },
    {
      category_name: 'food',
      icon: 'fas fa-utensils',
    },
    {
      category_name: 'others',
      icon: 'fas fa-pen',
    },

  )
  console.log('seed data created in mongodb')
})

