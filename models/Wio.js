const mongoose = require('mongoose')

const wioSchema = new mongoose.Schema(
  {
    description: { type: String },
    title: {
      main: { type: String },
      subtitle: { type: String },
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    data: { type: Array, default: [] },
    date: { type: Date, default: new Date() },
  },
  { collection: 'wio' },
  { autoIndex: false }
)

const Wio = mongoose.model('Wio', wioSchema)

module.exports = Wio
