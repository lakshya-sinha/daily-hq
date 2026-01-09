import mongoose from 'mongoose';
import Product from './ProductModel';

const OrderSchema = new mongoose.Schema({

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true
  },

  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",   
    required: true
  },

  name: {
    type: String,
  },

  status: {
    type: String,
    enum: ["pending", "success"],
    default: "dues"
  }
  
}, { timestamps: true });

const Order = mongoose.models.orders || mongoose.model('orders', OrderSchema);

export default Order;