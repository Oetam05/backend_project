const orderActions = require('./order.actions');

exports.createOrder = async (req, res) => {
  try {
    const userId = req.userData.id; // ID del usuario autenticado
    const bookIds = req.body.bookIds; // IDs de los libros a incluir en el pedido

    const order = await orderActions.createOrderMongo(userId, bookIds);
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userId = req.userData.id;
    const { startDate, endDate, status } = req.query;

    const filters = {};
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);      
      start.setUTCHours(0, 0, 0, 0); // Inicio del día
      end.setUTCHours(23, 59, 59, 999); // Final del día

      filters.createdAt = { $gte: start, $lte: end };
    }
    if (status) {
      filters.status = status;
    }

    const orders = await orderActions.getOrdersMongo(userId, filters);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.userData.id;
    const order = await orderActions.getOrderByIdMongo(orderId, userId);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const userId = req.userData.id; // Asegúrate de que el middleware de autenticación añade userData
    const { orderId, newStatus } = req.body;

    const updatedOrder = await orderActions.updateOrderStatus(orderId, userId, newStatus);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.userData.id;  // Suponiendo que se verifica la autenticidad del usuario

    const order = await orderActions.softDeleteOrder(orderId, userId);
    res.status(200).json({ message: 'Order deleted successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};