var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    fromCurrency:{type: String, required: true},
    toCurrency:{type: String, required: true},
    amount:{type: Number, required: true },
    amount_usd:{type: Number, required: true },
    amount_btc:{type: Number, required: true }
},{
    timestamps: true
});

module.exports = mongoose.model('Transaction',schema);