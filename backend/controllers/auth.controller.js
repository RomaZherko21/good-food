const bcrypt = require('bcrypt');
const process = require('dotenv').config().parsed;
const createError = require('http-errors');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const Customer = require('../models/customer.model');
const transporter = require('../config/mail');
const getRandomNumber = require('../helpers/getRandomNumber');

class AuthController {
  async signUp(req, res, next) {
    console.log(req.body);
    //Hashed Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Email check
    let token = getRandomNumber(4);

    //2 step Auth
    let secret = speakeasy.generateSecret({
      name: process.APP_NAME,
    });

    qrcode.toDataURL(secret.otpauth_url, (err, data) => {
      if (err) return next(createError(500, `QR code error!`));
      Customer.create({
        email: req.body.email,
        password: hashedPassword,
        active: JSON.stringify({ token, active: false }),
        base32: secret.base32,
      })
        .then(({ dataValues }) => {
          transporter.sendMail({
            from: process.EMAIL_NAME,
            to: req.body.email,
            subject: 'Code Authorization',
            html: `Your code: <strong>${token}</strong> `,
          });
          res.status(200).send({ ...dataValues, QR: data });
        })
        .catch(() => {
          return next(createError(401, `This email is already exist!`));
        });
    });
  }
  emailChecked(req, res, next) {
    Customer.findOne({ where: { email: req.body.email } })
      .then(async ({ dataValues }) => {
        if (req.body.token == JSON.parse(dataValues.active).token) {
          Customer.update(
            { active: 'true' },
            { where: { email: req.body.email } }
          )
            .then(function (rowsUpdated) {
              res.json(rowsUpdated);
            })
            .catch(() => {
              return next(createError(500, `User was not updated!`));
            });
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
        const validPassword = await bcrypt.compare(
          req.body.password,
          dataValues.password
        );

        const verified = speakeasy.totp.verify({
          secret: dataValues.base32,
          encoding: 'base32',
          token: req.body.token,
        });

        if (validPassword && dataValues.active && verified) {
          res.status(200).send({ ...dataValues });
        } else {
          return next(createError(401, `Wrong data!`));
        }
      })
      .catch(() => {
        return next(createError(401, `Wrong email!`));
      });
  }
  cookie(req, res, next) {
    let cookie = req.cookies.password;
    console.log(cookie);
    if (cookie !== undefined) {
      Customer.findOne({ where: { password: cookie } })
        .then(async ({ dataValues }) => {
          res.status(200).send({ ...dataValues });
        })
        .catch(() => {
          res.status(200).send('Wrong Cookies!');
        });
    } else {
      res.send('No Cookies!');
    }
  }
}

module.exports = new AuthController();
