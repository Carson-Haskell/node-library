const mongoose = require('mongoose')

const authorScmema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Author', authorScmema)
