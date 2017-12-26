'use strict';

class ExchangeService {

    constructor(service) {
        this.service = require('../services/' + service + '-service');
    }

    getAvailableCurrencies(){
        console.log(this.service.getAvailableCurrencies());
    }

    getMinAmount(){}
    getEstimateAmount() {}
    getTransaction(transactionId){}
    performtransaction(){}
}

var exchangeService = new ExchangeService('changelly');
module.exports = exchangeService;