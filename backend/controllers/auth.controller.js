const bcrypt = require("bcrypt");
const process = require("dotenv").config().parsed;
const createError = require('http-errors');

const Customer = require('../models/customer.model');
const transporter = require('../config/mail');
const getRandomNumber = require('../helpers/getRandomNumber');

class AuthController {
    async signUp(req, res) {

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        let token = getRandomNumber(4);

        transporter.sendMail({
            from: process.EMAIL_NAME,
            to: req.body.email,
            subject: 'Code Authorization',
            html:
                `Your code: <strong>${token}</strong> `,
        })

        Customer.create({ email: req.body.email, password: hashedPassword, active: JSON.stringify({ token, active: false }) })
            .then(({ dataValues }) => {
                res.status(200).send({ ...dataValues })
            })
            .catch(() => {
                return next(createError(401, `This email is already exist!`));
            });
    }
    emailChecked(req, res) {
        Customer.findOne({ where: { email: req.body.email } })
            .then(async ({ dataValues }) => {
                if (req.body.token == JSON.parse(dataValues.active).token) {
                    Customer.update(
                        { active: 'true' },
                        { where: { email: req.body.email } }
                    )
                        .then(function (rowsUpdated) {
                            res.json(rowsUpdated)
                        })
                        .catch(() => {
                            return next(createError(500, `User was not updated!`));
                        })
                } else {
                    return next(createError(401, `Wrong token!`));
                }
            })
            .catch(() => {
                return next(createError(401, `User was not found!`));
            });


    }
    signIn(req, res, next) {
        Customer.findOne({ where: { email: req.body.email } })
            .then(async ({ dataValues }) => {

                const validPassword = await bcrypt.compare(req.body.password, dataValues.password);

                if (validPassword && JSON.parse(dataValues.active).active) {
                    res.status(200).send({ ...dataValues })
                } else {
                    return next(createError(401, `Wrong data!`));
                }
            })
            .catch(() => {
                return next(createError(401, `Wrong email!`));
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