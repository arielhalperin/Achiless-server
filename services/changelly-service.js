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
        var message = {
            "jsonrpc": "2.0",
            "method": "getCurrenciesFull",
            "params": {},
            "id": "test"
        };

        return this.send(message)


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

                let currencies = [];
                for( let currency of res['result']){
                    if(currency.enabled){
                        currencies.push(currency);
                    }
                }
                return currencies;
            })
            .catch(function (err) {
                console.log(err)
            });

    }
}

