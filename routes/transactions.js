var express = require('express');
var router = express.Router();
var Transaction = require('../models/transaction');

router.get('/', function(req, res, next) {

    Transaction.find()
        .exec(function(err, transactions){
            if(err){
                return res.status(500).json({
                    title: 'An error Occured',
                    error: err
                });
            }

            res.status(200).json({
                message: "Success",
                obj: transactions
            });
        });
});

router.get('/get-estimate-amount', function(req, res, next) {
    let exchange = require('../services/exchange-service');

    //todo validation & handel exception
    let fromCurrency = req.query.from;
    let toCurrency = req.query.to;
    let amount = req.query.amount;
    return exchange.getEstimateAmount(fromCurrency, toCurrency, amount).then((data) => {
        res.status(200).json({
            message: "Success",
            obj: data
        })
    }).catch((err) => {
        return res.status(500).json({
            title: 'An error Occured',
            error: err
        });
    });
});

router.get('/get-min-amount', function(req, res, next) {
    let exchange = require('../services/exchange-service');

    //todo validation
    let fromCurrency = req.query.from;
    let toCurrency = req.query.to;
    return exchange.getMinAmount(fromCurrency, toCurrency).then((data) => {
        res.status(200).json({
            message: "Success",
            obj: data
        })
    }).catch((err) => {
        return res.status(500).json({
            title: 'An error Occured',
            error: err
        });
    });
});

router.post('/', function(req, res, next) {

    let exchangeService = require('../services/exchange-service');
    let fromCurrency = req.body.from;
    let toCurrency = req.body.to;
    let amount = req.body.amount;
    exchangeService.performTransaction(fromCurrency, toCurrency, amount)
        .then((data) => {
            let transaction = new Transaction({
                fromCurrency: req.body.fromCurrency,
                toCurrency: req.body.toCurrency,
                amount: req.body.amount,
                amount_usd: req.body.amount_usd,
                amount_btc: req.body.amount_btc,
            });

            transaction.save(function(err, user) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error Occured',
                        error: err
                    });
                }

                res.status(201).json({
                    message: "Transaction created",
                    obj: data
                });
            });
        }).catch((err) => {
            return res.status(500).json({
                title: 'An error Occured',
                error: err
            });
        });
});

module.exports = router;