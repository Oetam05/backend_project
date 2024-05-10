const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  books: [{
    type: String,
    required: true
  }],
  status: {
    type: String,
    enum: ['in_progress', 'completed', 'cancelled'],
    default: 'in_progress'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true,versionKey: false });

module.exports = mongoose.model('Order', orderSchema);
