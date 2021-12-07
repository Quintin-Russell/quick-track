require('dotenv/config');
const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');

const app = express();
const jsonMiddlerware = express.json();

app.use(staticMiddleware);

app.use(jsonMiddlerware);

app.get('/api/expenses', (req, res, next) => {
  const { userId } = req.body;

  const sql = `
  select *
  from "expenses"
  where "userId" = $1
  order by "expenseId" ASC
  `;
  const params = [userId];

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => {
      next(err);
    });
});

app.get('/api/paymentMethods', (req, res, next) => {
  const { userId } = req.body;

  const sql = `
  select *
  from "paymentMethods"
  where "userId" = $1
  order by "paymentMethodId" ASC
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.get('/api/spendingCategories', (req, res, next) => {
  const { userId } = req.body;

  const sql = `
  select *
  from "spendingCategories"
  where "userId" = $1
  order by "spendingCategoryId" ASC
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/expenses', (req, res, next) => {
  let { userId, amount, spendingCategory, comment, paymentMethod } = req.body;
  amount = Number.parseFloat(amount).toFixed(2);

  if (!userId || !spendingCategory || !paymentMethod) {
    throw new ClientError(400, 'UserId, Spending Caegory, and Payment Method are mandatory fields');
  }
  if (!amount) {
    throw new ClientError(400, 'Amount must be a number.');
  }

  const sql = `
  insert into "expenses" ("userId", "amount", "spendingCategoryId", "comment", "paymentMethodId")
  values ($1, $2, $3, $4, $5)
  returning *
  `;
  const params = [userId, amount, spendingCategory, comment, paymentMethod];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/paymentMethods', (req, res, next) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    throw new ClientError(400, 'UserId and name are mandatory fields');
  }

  const sql = `
  insert into "paymentMethods" ("userId", "name")
  values ($1, $2)
  returning *
  `;
  const params = [userId, name];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/spendingCategories', (req, res, next) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    throw new ClientError(400, 'UserId and name are mandatory fields');
  }

  const sql = `
  insert into "spendingCategories" ("userId", "name")
  values ($1, $2)
  returning *
  `;

  const params = [userId, name];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.patch('/api/expenses', (req, res, next) => {
  let { expenseId, amount, spendingCategory, comment, paymentMethod } = req.body;
  amount = Number.parseFloat(amount).toFixed(2);

  if (!expenseId || !spendingCategory || !paymentMethod) {
    throw new ClientError(400, 'ExpenseId, Spending Category, and Payment Method are mandatory fields');
  }
  if (!amount) {
    throw new ClientError(400, 'Amount must be a number.');
  }

  const sql = `
  update "expenses"
  set "amount" = $2, "spendingCategoryId" = $3, "comment" = $4, "paymentMethodId" = $5
  where "expenseId" = $1
  returning *
  `;
  const params = [expenseId, amount, spendingCategory, comment, paymentMethod];

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.patch('/api/spendingCategories', (req, res, next) => {
  const { spendingCategoryId, name } = req.body;

  if (!spendingCategoryId || !name) {
    throw new ClientError(400, 'SpendingCategoryId and Name are mandatory fields');
  }
  const sql = `
  update "spendingCategories"
  set "name" = $2
  where "spendingCategoryId" = $1
  returning *
  `;

  const params = [spendingCategoryId, name];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.patch('/api/paymentMethods', (req, res, next) => {
  const { paymentMethodId, name } = req.body;

  if (!name || !paymentMethodId) {
    throw new ClientError(400, 'Name and PaymentMethodId are mandatory fields');
  }

  const sql = `
  update "paymentMethods"
  set "name" = $2
  where "paymentMethodId" = $1
  returning *
  `;
  const params = [paymentMethodId, name];

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
