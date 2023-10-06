const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
})
mongoose.model("Inventory", inventorySchema)