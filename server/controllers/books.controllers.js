const Book = require("../models/books.models");
const MyBook = require("../models/myBooks.model");

const bookControllers = {
  // Public - Fetch all books
  async getAllBooks(req, res) {
    try {
      const books = await Book.find();
      res.json(books);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Protected - Fetch user's books
  async getMyBooks(req, res) {
    try {
      const mybooks = await MyBook.find({ userId: req.user.id }).populate('bookId');
      res.json(mybooks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Protected - Add book to user's list
  async addMyBook(req, res) {
    try {
      const bookId = req.params.bookId;

      const exists = await MyBook.findOne({ userId: req.user.id, bookId });
      if (exists) return res.status(400).json({ message: "Book already added" });

      const newMyBook = new MyBook({ userId: req.user.id, bookId });
      await newMyBook.save();

      res.status(201).json({ message: "Book added to your list", myBook: newMyBook });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Protected - Update reading status
  async updateStatus(req, res) {
    try {
      const { bookId } = req.params;
      const { status } = req.body;

      const updated = await MyBook.findOneAndUpdate(
        { userId: req.user.id, bookId },
        { status },
        { new: true }
      );

      if (!updated) return res.status(404).json({ message: "Book not found in your list" });

      res.json({ message: "Status updated", myBook: updated });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Protected - Update rating
  async updateRating(req, res) {
    try {
      const { bookId } = req.params;
      const { rating } = req.body;

      const updated = await MyBook.findOneAndUpdate(
        { userId: req.user.id, bookId },
        { rating },
        { new: true }
      );

      if (!updated) return res.status(404).json({ message: "Book not found in your list" });

      res.json({ message: "Rating updated", myBook: updated });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = bookControllers;
