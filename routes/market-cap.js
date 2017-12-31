var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let marketCapService = require('../services/market-cap-service');
    let limit = req.query.limit ? req.query.limit : null;
    let marketCapPromise = limit ? marketCapService.getMarketCap(limit): marketCapService.getMarketCap();

    marketCapPromise.then((data) => {
        return res.status(200).json({
            message: "Success",
            obj: data
        })
    }).catch((err) => {
        return res.status(500).json({
            title: 'An error Occured',
            error: err
        });
    })
});

module.exports = router;