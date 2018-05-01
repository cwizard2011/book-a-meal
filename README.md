[![Build Status](https://travis-ci.org/cwizard2011/book-a-meal.svg?branch=chores-tests-157119250)](https://travis-ci.org/cwizard2011/book-a-meal)
<a href="https://codeclimate.com/github/codeclimate/codeclimate/maintainability"><img src="https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability" /></a>
<a href="https://codeclimate.com/github/codeclimate/codeclimate/test_coverage"><img src="https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage" /></a>
[![Coverage Status](https://coveralls.io/repos/github/cwizard2011/book-a-meal/badge.svg?branch=chores-tests-157119250)](https://coveralls.io/github/cwizard2011/book-a-meal?branch=chores-tests-157119250)
# Book-A-Meal
Book-A-Meal is an application that allows customers to make food orders and helps the food 
vendor know what the customers want to eat.

# Development
The development is broken down into two parts, the server side and the client side. The server side (API/backend) is developed using Express, NodeJs and PostgreSQL for persisting data, sequelize for ORM, Json Web token for authentication. React redux is used for the frontend

## API DOCUMENTATION

# API FEATURE
Book a meal has the following features
work in progress.....

## INSTALLATION
- Clone the repository locally on your desktop using ```git clone https://github.com/cwizard2011/book-a-meal.git```
- Navigate from your terminal to book-a-meal using ```cd book-a-meal```
- Pull the development branch using ```git pull origin develop```
- Install the dependencies using ```npm install```
- You can view the app using ```localhost:3000/```
- Run ```npm run test``` to run all endpoints test

You can also access [book-a-meal](https://petermealapp.herokuapp.com/api/v1/meals) api on heroku

# TESTING WITH POSTMAN
The API contains different endpoints with their respective payload in the table below

|Endpoints|Functions|Payloads|Requets Method|
|---------|---------|--------|--------------|
|/api/v1/menus| Post a new menu|menu name, date, meals|POST|
|/api/v1/menus| Get all menus|No payload| GET|
