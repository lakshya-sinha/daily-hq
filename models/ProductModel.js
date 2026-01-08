import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide product name']
    },
    cp: {
        type: Number,
        required: [true, 'please provide product cost']
    }, 
    sp: {
        type: Number,
        required: [true, 'please provide product value']
    },
    mv: {
        type: Number,
        required: [true, 'please provide product market value']
    }, 
    status: {
        type: String,
        enum: ["dues", "success"]
    }
}, {timestamps: true});

const Product = mongoose.models.products || mongoose.model("products", ProductSchema);

export default Product;