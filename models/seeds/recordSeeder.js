if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const bcrypt = require('bcryptjs')
const Record = require('../record')
const User = require('../user')

const SEED_DATA = require('./data.json')

const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    email: 'user2@example.com',
    password: '12345678'
  }
]

const createUser = async (email, password) => {
  const user = await User.findOne({ email })
  if (user) return user

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const newUser = await User.create({
    email,
    password: hash
  })
  console.log(newUser._id)
  return newUser
}

db.once('open', async () => {
  try {
    const records = SEED_DATA.records

    const userOne = await createUser(SEED_USER[0].email, SEED_USER[0].password)
    await Promise.all(Array.from({ length: 3 },
      (_, i) => Record.create({
        ...records[i], userId: userOne._id
      }))
    )

    const userTwo = await createUser(SEED_USER[1].email, SEED_USER[1].password)
    await Promise.all(Array.from({ length: 3 },
      (_, i) => Record.create({
        ...records[i + 3], userId: userTwo._id
      }))
    )

    console.log('Record seed data created in mongodb')
    db.close()
  } catch (err) {
    console.log(err)
  }
})