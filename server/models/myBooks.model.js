const {Schema, model} = require('mongoose');

const myBookSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, enum: ['Want to Read', 'Reading', 'Completed'], default: 'Want to Read' },
  rating: { type: Number, min: 1, max: 5 },
});

const myBookModel = model('MyBook', myBookSchema);

module.exports= myBookModel