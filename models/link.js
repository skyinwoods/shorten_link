const { links } = require('express/lib/response')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const linkSchema = new Schema({
  origin_link:{
    type: String,
    required: true
  },
  new_link:{
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Link', linkSchema)