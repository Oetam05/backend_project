const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publicationDate: Date,
  genre: String,
  publisher: String,
  isActive: { type: Boolean, default: true },
  editorial:String
},{versionKey: false});

module.exports = mongoose.model('Book', bookSchema);
