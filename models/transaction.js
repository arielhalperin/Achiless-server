var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    currencyFrom:{type: String, required: true},
    currencyTo:{type: String, required: true},
    amount:{type: Number, required: true },
    payoutAddress:{type: String, required: true},
    exchangeId:{type: String, required: true},
    exchangePayinAddress:{type: String, required: true},
    exchangePayinExtraId:{type: String},
    refundAddress:{type: String},
    refundExtraId:{type: String},
    status:{type: String, enum : ['new','processing','done'], required: true},

},{
    timestamps: true
});

module.exports = mongoose.model('Transaction',schema);