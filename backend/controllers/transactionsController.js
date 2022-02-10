const { redirect } = require("express/lib/response");
const db = require("../database");
const model = require('../models/transactionsModel');

class TransactionsController {


    async profile(req, res) {


        if (req.body.userId !== undefined) {
            var income;
            var expense;

            const incomeResults = await model.getIncome({ userId: req.body.userId });
            if (!incomeResults[0]["sum(value)"]) {
                income = 0;
            }
            else {
                income = incomeResults[0]["sum(value)"];
            }

            const expenseResults = await model.getExpense({ userId: req.body.userId })
            if (!expenseResults[0]["sum(value)"]) {
                expense = 0;
            }
            else {
                expense = expenseResults[0]["sum(value)"];
            }

            const results = await model.getTransactions({ userId: req.body.userId });
            res.json({
                user: req.user,
                transactions: results,
                income: income,
                expense: expense
            });


        } else {
            res.json({
                'msg': "error"
            })
        }
    };

    async add(req, res) {

        if (req.body.userId !== undefined) {

            const userId = req.body.userId;
            var { type, value } = req.body;

            value = parseFloat(value);

            if (type === '' || typeof value !== 'number' || value === 0 || value === '' || value > 100000 || value < -100000 || type.length > 30) {
                res.json({
                    'msg': 'check the input form'
                })
            } else {

                model.addTransaction({ type: type, value, userId: userId })
                res.json({
                    'msg': 'transaction added'
                })
            }
        } else {
            res.json({
                'msg': "error"
            })
        }
    };

    async delete(req, res) {

        const idTransaction = req.body.id;
        const userId = req.body.userId;


        const results = await model.getUserTransaction({ id: idTransaction, userId: userId });
        console.log(results);
        if (results.length === 0) {
            res.json({
                'msg': "no transaction"
            })
        } else {
            model.deleteTransaction({ id: idTransaction, userId: userId });
            res.json({
                'msg': "transaction deleted"
            })
        }
    };

    async allTransactions(req, res) {

        if (req.user != undefined) {

            const results = await model.getTransactions({ userId: req.user.id });
            res.render('all', {
                transactions: results,
                user: req.user
            });
        } else {
            res.redirect('/');
        }
    };

    async filter(req, res) {

        const { dateStart, dateEnd } = req.body;

        console.log(dateEnd, dateStart);



        if (dateStart > dateEnd || dateStart == '' || dateEnd == '') {
            res.render('all', {
                transactions: [],
                msg: "Input a valid type"
            })
        }

        const results = await model.filterTransactions({ userId: req.user.id, dateStart, dateEnd });

        res.render('all', {
            transactions: results,
            user: req.params,
        })
    }

}

module.exports = new TransactionsController();