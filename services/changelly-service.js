var Config = require('../config/config'),
    conf = new Config();
var apiKey = conf.changelly.key;
var apiSecret = conf.changelly.secret;
var changellyUrl = conf.changelly.url;
var http = require('http');
var crypto = require('crypto');
var rp = require('request-promise');

module.exports = {

    getAvailableCurrencies: function () {
        let message = {
            "jsonrpc": "2.0",
            "method": "getCurrenciesFull",
            "params": {},
            "id": "1"
        };

        return this.send(message).then((data) => {
            let currencies = [];
            for( let currency of data){
                if(currency.enabled){
                    currencies.push(currency);
                }
            }
            return currencies;
        });


    },

    getMinAmount: function (fromCurrency, toCurrency) {
        let message = {
            "id": "test",
            "jsonrpc": "2.0",
            "method": "getMinAmount",
            "params": {
                "from": fromCurrency,
                "to": toCurrency
            }
        };

        return this.send(message);


    },

    getEstimateAmount: function (fromCurrency, toCurrency, amount) {
        let message = {
            "id": "test",
            "jsonrpc": "2.0",
            "method": "getExchangeAmount",
            "params": {
                "from": fromCurrency,
                "to": toCurrency,
                "amount": amount
            }
        };

        return this.send(message);


    },

    performTransaction: function (fromCurrency, toCurrency, amount, toAddress, extraId = null, refundAddress = null, refundExtraId = null) {
        let message = {
            "jsonrpc": "2.0",
            "method": "createTransaction",
            "params": {
                "from": fromCurrency,
                "to": toCurrency,
                "address": "0x49f79352100bd92eb2ba3daa30852f03abdd8315",
                "extraId": null,
                "amount": amount,
                "refundAddress": "4JUdGzvrMFDWrUUwY3toJATSeNwjn54LkCnKBPRzDuhzi5vSepHfUckJNxRL2gjkNrSqtCoRUrEDAgRwsQvVCjZbRzJ6u2Z6LNn1paZHkm", //optional
                "refundExtraId": "3a3732229ec701e1105a443ff86b751e50accebdeeee9ab69b36835c1f83ef75" // optional
            },
            "id": 1
        };

        return this.send(message);


    },

    send: function(message) {
        var sign = crypto
            .createHmac('sha512', apiSecret)
            .update(JSON.stringify(message))
            .digest('hex');

        var headers = {
            'api-key' :  apiKey,
            'sign' : sign,
            'Content-type' : 'application/json'
        };

        var options = {
            "uri": changellyUrl,
            "method" : "POST",
            "headers" : headers,
            "body": message,
            "json": true
        };

        return rp(options)
            .then(function (res) {
                if(!res || !res['result']){
                    console.log(res)
                }

                return res['result'];
            })
            .catch(function (err) {
                console.log(err)
            });

    }
}

