const bookActions = require('./book.actions');

exports.createBook = async (req, res) => {
  try {
    const bookData = {
      ...req.body,
      publisher: req.userData.id  // Asignar automáticamente el ID del usuario como publisher
    };
    const newBook = await bookActions.createBookMongo(bookData);
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

exports.getBookById = async (req, res) => {
  const result = await bookActions.getBookByIdMongo(req.params.id);

  if (result.error) {
    return res.status(result.statusCode).json({ message: result.message });
  }

  res.status(200).json(result.data);
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
