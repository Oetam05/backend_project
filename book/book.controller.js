const bookActions = require('./book.actions');

exports.createBook = async (req, res) => {
  try {
    const newBook = await bookActions.createBookMongo(req.body);
    res.status(201).send(newBook);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getBooks = async (req, res) => {
  try {
    const filters = {};
    if (req.query.genre) filters.genre = req.query.genre;
    if (req.query.author) filters.author = req.query.author;
    if (req.query.publisher) filters.publisher = req.query.publisher;
    if (req.query.editorial) filters.editorial = req.query.editorial;
    if (req.query.title) filters.title = req.query.title;
    if (req.query.publicationDate) filters.publicationDate = req.query.publicationDate;
    const books = await bookActions.getBooksMongo(filters);
    res.status(200).send(books);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await bookActions.updateBookMongo(req.params.id, req.body);
    if (!updatedBook) {
      return res.status(404).send();
    }
    res.status(200).send(updatedBook);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await bookActions.deleteBookMongo(req.params.id);
    if (!deletedBook) {
      return res.status(404).send();
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error);
  }
};
