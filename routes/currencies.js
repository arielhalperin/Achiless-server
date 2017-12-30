var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    let exchange = require('../services/exchange-service');
    return exchange.getAvailableCurrencies().then((data) => {
        return res.status(200).json({
            message: "Success",
            obj: data
        });
    });
});

module.exports = router;