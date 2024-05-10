const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

const bookRoutes = require('./book/book.route');
app.use('/books', bookRoutes);

const userRoutes = require('./user/user.route');
app.use('/users', userRoutes);

const orderRoutes = require('./order/order.route');
app.use('/orders', orderRoutes);


// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB', err));


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
