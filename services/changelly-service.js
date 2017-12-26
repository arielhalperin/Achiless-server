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
            "method": "getCurrencies",
            "params": {},
            "id": 1
        };
        //
        // return this.send(message);

        var options = {
            "method": "POST",
            "uri": "https://api.changelly.com",
            "headers": {
                "content-type": "application/json"
            }
        };

        rp(options)
            .then(function (res) {
                console.log(res)
            })
            .catch(function (err) {
                console.log(err)
            });


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
            "method" : "POST",
            "hostname" : changellyUrl,
            "header" : headers
        };

        var req = http.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                var body = Buffer.concat(chunks);
                console.log(body.toString());
            });

            req.write(JSON.stringify(message));
            req.end();
        });
    }
}

