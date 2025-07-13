const {Router} = require('express');
const bookControllers = require('../controllers/books.controllers');
const authMiddleware = require('../middleware/auth.middleWare');
const booksRouter = Router();


// Public
booksRouter.get('/api/books', bookControllers.getAllBooks);

// Protected
booksRouter.get('/mybooks', authMiddleware, bookControllers.getMyBooks);
booksRouter.post('/mybooks/:bookId', authMiddleware, bookControllers.addMyBook);
booksRouter.patch('/mybooks/:bookId/status', authMiddleware, bookControllers.updateStatus);
booksRouter.patch('/mybooks/:bookId/rating', authMiddleware, bookControllers.updateRating);

module.exports = booksRouter;
