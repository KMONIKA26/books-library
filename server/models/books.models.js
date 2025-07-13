const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
  title: String,
  author: String,
  coverImage: String,
  availability: Boolean,
});

const booksModel = model('Book', bookSchema);
module.exports= booksModel
