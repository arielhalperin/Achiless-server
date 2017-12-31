'use strict';

class ExchangeService {

    constructor(service) {
        this.service = require('../services/' + service + '-service');
    }

    getAvailableCurrencies(){
        return this.service.getAvailableCurrencies().then((currencies) => {
            var fs = require('fs');
            let currenciesWithImages = [];

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

    getMinAmount(fromCurrency, toCurrency) {
        return this.service.getMinAmount(fromCurrency, toCurrency);
    }

    getEstimateAmount(fromCurrency, toCurrency, amount) {
        return this.service.getEstimateAmount(fromCurrency, toCurrency, amount);
    }
    getTransaction(transactionId){}

    performTransaction(fromCurrency, toCurrency, amount, toAddress, extraId = null, refundAddress = null, refundExtraId = null){
        return this.service.performTransaction(fromCurrency, toCurrency, amount, toAddress,
            extraId = null, refundAddress = null, refundExtraId = null);
    }
}

var exchangeService = new ExchangeService('changelly');
module.exports = exchangeService;