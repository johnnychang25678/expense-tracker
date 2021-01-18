if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')
const SEED_DATA = require('./data.json')

db.once('open', async () => {
  const categories = SEED_DATA.categories
  for (category of categories) {
    const categoryExist = await Category.findOne({ category_name: category.category_name })
    if (!categoryExist) {
      await Category.create({
        ...category
      })
    }

  }
  console.log('Category seed data created in mongodb')
  db.close()

})

