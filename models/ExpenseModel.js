import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({

  name: {
    type: String, 
    required: [true, 'please provide expense name']
  },

  cost: {
    type: Number, 
    required: [true, 'please provide expense cost']
  },

  why: {
    type: String,
    required: [true, 'please provide expense cost']
  },

  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",   
    required: true
  },

  
}, { timestamps: true });

const Expense = mongoose.models.expenses || mongoose.model('expenses', OrderSchema);

export default Expense;