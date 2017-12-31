var express = require('express');
var router = express.Router();
var Transaction = require('../models/transaction');
var Receipt = require('../models/receipt');

router.get('/', function(req, res, next) {

    Transaction.find()
        .exec(function(err, transactions){
            if(err){
                return res.status(500).json({
                    title: 'An error Occured',
                    error: err
                });
            }

            return res.status(200).json({
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
        return res.status(200).json({
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
        return res.status(200).json({
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
    let currencyFrom = req.body.from;
    let currencyTo = req.body.to;
    let amount = req.body.amount;
    exchangeService.performTransaction(currencyFrom, currencyTo, amount)
    .then((exchangeTransaction) => {
        let transaction = new Transaction({
            currencyFrom: currencyFrom,
            currencyTo: currencyTo,
            amount: amount, //todo amount vs exchangeTransaction.amount
            payoutAddress:exchangeTransaction.payoutAddress,
            exchangeId: exchangeTransaction.id,
            exchangePayinAddress:exchangeTransaction.payinAddress,
            exchangePayinExtraId:exchangeTransaction.payinExtraId,
            refundAddress:exchangeTransaction.refundAddress,
            refundExtraId:exchangeTransaction.refundExtraId,
            status:exchangeTransaction.status,
        });

        return transaction.save();
    }).then((transaction) => {
        let receipt = new Receipt({
            currencyFrom: currencyFrom,
            currencyTo: currencyTo,
            amount: amount,
            amount_usd: amount + 1, //todo calculate
            amount_btc: amount + 2, //todo calculate
            transaction: transaction
        });

        return receipt.save();

    }).then((data)=> {
        return res.status(201).json({
            message: "Transaction created",
            obj: data
        });
    }).catch((err) => {
        return res.status(500).json({
            title: 'An error Occured',
            error: err
        });
    });
});

module.exports = router;