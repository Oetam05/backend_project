const Book = require('../book/book.model');
const mongoose = require('mongoose');

const createBookMongo = async (bookData) => {
  try {
    const book = await Book.create(bookData);
    return book;
  } catch (error) {
    throw error;
  }
};

const getBooksMongo = async (filters) => {
  try {
    const query = { isActive: true, ...filters };
    const books = await Book.find(query);
    return books;
  } catch (error) {
    throw error;
  }
};

const getBookByIdMongo = async (id) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { error: true, message: 'Invalid ID format', statusCode: 400 };
  }

  const book = await Book.findById(id);
  if (!book) {
    return { error: true, message: 'Book not found', statusCode: 404 };
  }
  return { error: false, data: book };
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
    const deletedBook = await Book.findByIdAndUpdate(id, { isActive: false });
    return deletedBook;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createBookMongo,
  getBooksMongo,
  updateBookMongo,
  deleteBookMongo,
  getBookByIdMongo
};
