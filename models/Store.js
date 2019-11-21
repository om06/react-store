var mongoose = require('mongoose');


var StoreSchema = new mongoose.Schema({
    name: String,
    description: String,
    quantity: Number,
    created_on: { type: Date },
    updated_on: { type: Date, default: Date.now },
    file: String
  });


module.exports = mongoose.model('Store', StoreSchema);
