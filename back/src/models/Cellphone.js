const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  model: String,
  price: Number,
  brand: String,
  photo: String,
  startDate: Date,
  endDate: Date,
  color: String,
  code: {type : String, unique : true}
})

module.exports = mongoose.model('Cellphone',PostSchema)