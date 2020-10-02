const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  // if I don't specify the collection, mongoose will use
  // the pluralized version given by the name I give to the model. Here: User => users
  { collection: 'users' },
  // get rid of __v field in my DB
  // { versionKey: false },
  { autoIndex: false }
)

const User = mongoose.model('User', userSchema)

module.exports = User
