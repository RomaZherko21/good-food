const Customer = require('../models/customer.model');
const bcrypt = require("bcrypt");

class CustomersController {
    async postCustomer(req, res) {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        Customer.create({ email: req.body.email, password: hashedPassword })
            .then(({ dataValues }) => {
                res.status(200).send({ email: req.body.email, password: req.body.password, id: dataValues.id })
            })
            .catch(err => {
                res.status(404).send(err.message)
            });
    }
    getCustomer(req, res) {
        console.log(res.body);
        res.send('hello')
        // Customer.findOne({ where: { id: req.params.customerId } })
        //     .then(customer => {
        //         res.status(200).send(customer)
        //     })
        //     .catch(err => {
        //         res.status(404).send(err.message)
        //     });
    }
    getCustomers(req, res) {
        Customer.findAll({ raw: true })
            .then(customers => {
                res.status(200).send(customers)
            })
            .catch(err => {
                res.status(404).send(err.message)
            });
    }

    getCustomerAccounts(req, res) {
        res.send('/customers/:customerId/accounts');
    }
    getCustomerAccount(req, res) {
        res.send('/customers/:customerId/accounts/:accountId');
    }
}

module.exports = new CustomersController();