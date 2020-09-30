const mongoose = require('mongoose');

var shopSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    stock: {
        type: Number
    },
});

mongoose.model('shop', shopSchema);
