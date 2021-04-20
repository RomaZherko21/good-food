const Customer = require('../models/customer.model');
const bcrypt = require("bcrypt");
const transporter = require('../config/mail');
const process = require("dotenv").config().parsed;
const getRandomNumber = require('../helpers/getRandomNumber');

class AuthController {
    async signUp(req, res) {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        let emailCode = getRandomNumber(4);

        transporter.sendMail({
            from: process.EMAIL_NAME,
            to: req.body.email,
            subject: 'Code Authorization',
            html:
                `Your code: <strong>${emailCode}</strong> `,
        })


        Customer.create({ email: req.body.email, password: hashedPassword, active: JSON.stringify({ emailCode, active: false }) })
            .then(({ dataValues }) => {
                res.status(200).send({ ...dataValues })
            })
            .catch(err => {
                res.status(404).send(err.message)
            });
    }
    emailChecked(req, res) {
        Customer.findOne({ where: { email: req.body.email } })
            .then(async ({ dataValues }) => {
                if (req.body.emailCode == JSON.parse(dataValues.active).emailCode) {
                    Customer.update(
                        { active: 'true' },
                        { where: { email: req.body.email } }
                    )
                        .then(function (rowsUpdated) {
                            res.json(rowsUpdated)
                        })
                        .catch(() => { res.send('FUCKING ERRROR') })
                }
            })
            .catch(err => {
                res.status(404).send(err.message)
            });


    }
    signIn(req, res) {
        Customer.findOne({ where: { email: req.body.email } })
            .then(async ({ dataValues }) => {

                const validPassword = await bcrypt.compare(req.body.password, dataValues.password);

                if (validPassword && JSON.parse(dataValues.active).active) {
                    res.status(200).send({ ...dataValues })
                } else {
                    res.status(400).send({ error: "Invalid Password" });
                }
            })
            .catch(err => {
                res.status(404).send(err.message)
            });
    }
    cookie(req, res) {

        let cookie = req.cookies.password;
        if (cookie !== undefined) {
            Customer.findOne({ where: { password: cookie } })
                .then(async ({ dataValues }) => {
                    res.status(200).send({ ...dataValues })
                })
                .catch(() => {
                    res.status(200).send('Wrong Cookies!')
                });
        } else {
            res.send('No Cookies!')
        }
    }
}

module.exports = new AuthController();