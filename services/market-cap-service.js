'use strict';

var rp = require('request-promise');
var Config = require('../config/config'),
    conf = new Config();
class MarketCapService {
    getMarketCap(limit = 20) {
        var options = {
            "uri": conf.marketcap.url + '?limit=' + limit,
            "method" : "GET",
            "json": true
        };

        return rp(options).then((data) => {
            var fs = require('fs');
            let currenciesWithImages = [];

            for( let currency of data){
                const imageRelativePath = 'images/coins/' + currency.symbol.toLowerCase() + '.png';
                const currencyIconPath = __dirname + '/../public/' + imageRelativePath;
                if (fs.existsSync(currencyIconPath)) {
                    currency.image = imageRelativePath;
                }

                currenciesWithImages.push(currency);
            }
            return currenciesWithImages;
        })
    }
}

var marketCapService = new MarketCapService();
module.exports = marketCapService;