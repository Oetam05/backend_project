const mongoose = require('mongoose');
const Book = require('../book/book.model');
const Order = require('./order.model');

const createOrderMongo = async (userId, bookIds) => {
  // Verificar que todos los libros existen y pertenecen al mismo vendedor
  const books = await Book.find({ _id: { $in: bookIds }, isActive: true});
  if (books.length !== bookIds.length) {
    throw new Error('One or more books could not be found or are no longer active.');
  }

  // Asegurarte de que todos los libros pertenecen al mismo vendedor
  const uniqueSellerIds = new Set(books.map(book => book.publisher.toString()));
  if (uniqueSellerIds.size !== 1) {
    throw new Error('All books must be from the same seller.');
  }

  // Crear el pedido
  const order = new Order({
    user: userId,
    books: bookIds,
    status: 'in_progress'
  });

  await order.save();
  return order;
};

const getOrdersMongo = async (userId, filters) => {
  // Encuentra todos los libros que este usuario ha vendido
  const userBooks = await Book.find({ publisher: userId }).select('_id');
  const userBookIds = userBooks.map(book => book._id);

  // Construye el filtro para encontrar pedidos que el usuario ha hecho o que incluyan libros que él vende
  const query = {
    $or: [
      { user: userId }, // Pedidos que el usuario ha realizado
      { books: { $in: userBookIds } } // Pedidos que contienen libros que el usuario vende
    ],
    isActive: true,
    ...filters
  };

  return await Order.find(query);
};

const getOrderByIdMongo = async (orderId, userId) => {
  const userBooks = await Book.find({ publisher: userId }).select('_id');
  const userBookIds = userBooks.map(book => book._id);
  const query = {
    _id: orderId,
    $or: [
      { user: userId }, // Pedidos que el usuario ha realizado
      { books: { $in: userBookIds } } // Pedidos que contienen libros que el usuario vende
    ],
  };
  const order = await Order.findOne(query);
  if (!order) {
    throw new Error('Order not found or unauthorized');
  }
  return order;
};

const updateOrderStatus = async (orderId, userId, newStatus) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new Error('Order not found');
  }

  // Verifica que el usuario tenga permiso para cambiar el estado
  if (order.user.toString() === userId && newStatus === 'cancelled') {
    // El usuario que realizó el pedido puede cancelar
    order.status = newStatus;
  } else {
    // Verifica si todos los libros del pedido fueron vendidos por el userId
    const allBooksSoldByUser = await Book.find({ _id: { $in: order.books }, publisher: userId }).countDocuments() === order.books.length;
    if (allBooksSoldByUser && (newStatus === 'completed' || newStatus === 'cancelled')) {
      // Solo el vendedor de todos los libros puede completar o cancelar el pedido
      order.status = newStatus;

      if (newStatus === 'completed') {
        // "Borrar" los libros al completar el pedido
        await Book.updateMany({ _id: { $in: order.books } }, { $set: { isActive: false } });
      }
    } else {
      throw new Error('Unauthorized to update the order status');
    }
  }

  await order.save();
  return order;
};

const softDeleteOrder = async (orderId, userId) => {
  const order = await Order.findOneAndUpdate(
    { _id: orderId, user: userId, isActive: true },
    { isActive: false },
    { new: true }
  );
  if (!order) {
    throw new Error('Order not found or unauthorized');
  }
  return order;
};

module.exports = {
  createOrderMongo,
  getOrdersMongo,
  updateOrderStatus,
  getOrderByIdMongo,
  softDeleteOrder
};
