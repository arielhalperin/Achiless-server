'use strict';

class ExchangeService {

    constructor(service) {
        this.service = require('../services/' + service + '-service');
    }

    getAvailableCurrencies(){
        return this.service.getAvailableCurrencies().then((currencies) => {
            var fs = require('fs');
            let currenciesWithImages = [];
            // var os = require("os");
            // var hostname = os.hostname();
            for( let currency of currencies){
                const currencyIconPath = __dirname + '/../public/images/coins/' + currency.name + '.png';
                if (fs.existsSync(currencyIconPath)) {
                    currency.image = 'images/coins/' + currency.name + '.png';
                    currenciesWithImages.push(currency);
                }
            }
            return currenciesWithImages;
        });

    }

    getMinAmount(){}
    getEstimateAmount() {}
    getTransaction(transactionId){}
    performtransaction(){}
}

var exchangeService = new ExchangeService('changelly');
module.exports = exchangeService;