const Book = require('./book.model');

const createBookMongo = async (bookData) => {
  try {
    const book = await Book.create(bookData);
    return book;
  } catch (error) {
    throw error;
  }
};

const getBooksMongo = async () => {
  try {
    const books = await Book.find();
    return books;
  } catch (error) {
    throw error;
  }
};

const updateBookMongo = async (id, bookData) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, bookData, { new: true });
    return updatedBook;
  } catch (error) {
    throw error;
  }
};

const deleteBookMongo = async (id) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    return deletedBook;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createBookMongo,
  getBooksMongo,
  updateBookMongo,
  deleteBookMongo
};
