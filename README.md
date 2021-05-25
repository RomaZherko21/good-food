# Good food

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Purpose

This project is something like food blog, where you can create account, compose your own recipes and communicate with other bloggers.

### This project was created to practise with:

- **_Backend:_** MySQL, express, sequelize, socketIO, lowDB;
- **_Frontend:_** React, react hooks, TypeScript;
- **_Testing:_** react-testing-library, supertest;
- **_DevOps:_** docker.

## Installation

- 'npm install' and then 'npm start' on ./backend and ./frontend.
- .env file on backend need your own configuration.
- you need to run MySQL DB locally (I've used XAMPP to run Apache and MySQL).

## Available Scripts

In the project directory, you can run:

### `npm start` on backend and frontend folders

Runs the app in the development mode.

### `npm test` on backend and frontend folders

Launches the test runner in the interactive watch mode.

## API

* **_./customers:_** operations with customers;
        1. *post('./customers/changeMetaData')* change customer meta data 
* **_./products:_** operations with products;
  1. *get('./products')* get all products
  2. *get('./products/category)* get category products 
  3. *get('./products/:category/:id)* get product by id 
* **_./auth:_** signIn, signUp, cookies requests;
  1. *post('./auth/signUp')* create new user (emailChecked:false)
  2. *post('./auth/emailChecked')* email token checked -> emailChecked:true -> create new user (emailChecked:true) 
  3. *post('./auth/signIn')* logged into account with email,password and QR code 
  4. *get('./auth/cookie')* main page on load -> get cookies
