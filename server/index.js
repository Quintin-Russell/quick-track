require('dotenv/config');
const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');

const countDecimal = function (num) {
  if (num.toString().split('.')[1].length > 2) {
    return true;
  }
};

const app = express();
const jsonMiddlerware = express.json();

app.use(staticMiddleware);

app.use(jsonMiddlerware);

app.post(':8081/api/expenses', (req, res, next, err) => {
  const { userId, amount, spendingCategory, comment, paymentMethod } = req.body;
  if (!amount || !spendingCategory || !paymentMethod) {
    throw new ClientError(400, 'Please enter a valid amount, Spending Caegory, and Payment Method');
  }
  if (countDecimal(amount) || (typeof (amount) !== 'number')) {
    throw new ClientError(400, 'Amount must be a number with no more than 2 decimal places.');
  }
  const sql = `
  insert into "expenses" ("amount", "spendingCategory","comment", "paymentMethod")
  values ($1, $2, $3, $4, $5)
  returning *
  `;
  const params = [userId, amount, spendingCategory, comment, paymentMethod];
  db.query(sql, params)
    .then(result => res.status(201).json(result.json()))
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
