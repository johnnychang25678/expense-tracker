# Expense Tracker
A simple CRUD web application build with `node.js`. 
- web server: `express`
- view engine: `handlebars`
- database: `mongodb` with `mongoose` as ODM

## Host
The app is hosted with Heroku at: https://boiling-cove-29311.herokuapp.com/

## Features
- Create: User is able to create an expense
- Read: User is able to view all the expenses
- Update: User is able to edit an expense
- Delete: User is able to delete an expense
- Filter: User is able to filter expense by category


## Quick Start
1. Install server depenencies
```
npm install
```
2. Write seed data to database
```
npm run seed
```
3. Run server with nodemon
```
npm run dev
```
4. Browse with browser
```
http://localhost:3000
```