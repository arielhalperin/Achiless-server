var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var exchange = require('../services/exchange-service');
    return exchange.getAvailableCurrencies().then((data) => {
        res.status(200).json({
            message: "Success",
            obj: data
        });
    });
});

module.exports = router;