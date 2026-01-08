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

  status: {
    type: String,
    enum: ["dues", "success"],
    default: "dues"
  }
  
}, { timestamps: true });

const Order = mongoose.models.orders || mongoose.model('orders', OrderSchema);

export default Order;