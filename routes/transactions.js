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

router.post('/', function(req, res, next) {

    var transaction = new Transaction({
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
            obj: transaction
        });
    });
});

module.exports = router;