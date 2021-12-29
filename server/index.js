require('dotenv/config');
const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');
const cors = require('cors');

const app = express();
const jsonMiddlerware = express.json();

app.use(
  cors({
    origin: ['http://127.0.0.1:3000', 'http://localhost:3000']
  })
);

app.use(staticMiddleware);

app.use(jsonMiddlerware);

app.get('/api/expenses/:userId', (req, res, next) => {
  const userId = req.params.userId;
  const sql = `
  select *
  from "expenses"
  where "userId" = $1
  order by "date" ASC
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

app.get('/api/paymentMethods/:userId', (req, res, next) => {
  const userId = req.params.userId;

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

app.get('/api/spendingCategories/:userId', (req, res, next) => {
  const userId = req.params.userId;

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

app.get('/api/users/:userId', (req, res, next) => {
  const userId = req.params.userId;

  if (!userId) {
    throw new ClientError(400, 'User Id is mandatory field');
  }

  const sql = `
  select "monthlyBudget", "timeFrame"
  from "users"
  where "userId" = $1
  `;
  const params = [userId];
  db.query(sql, params)
    .then(result => res.status(201).json(result.rows[0]))
    .catch(err => next(err));
});

app.post('/api/expenses', (req, res, next) => {
  const { userId, date, amount, spendingCategory, comment, paymentMethod } = req.body;

  if (!userId || !date || !spendingCategory || !paymentMethod) {
    throw new ClientError(400, 'User Id, Date, Spending Category, and Payment Method are mandatory fields');
  }
  if (!amount) {
    throw new ClientError(400, 'Amount must be a number.');
  }

  const sql = `
  insert into "expenses" ("userId", "date", "amount", "spendingCategoryId", "comment", "paymentMethodId")
  values ($1, $2, $3, $4, $5, $6)
  returning *
  `;
  const params = [userId, date, amount, spendingCategory, comment, paymentMethod];
  db.query(sql, params)
    .then(result => res.status(201).json(result.rows))
    .catch(err => next(err));
});

app.post('/api/paymentMethods', (req, res, next) => {
  const { userId, name } = req.body;

  if (!userId || !name) {
    throw new ClientError(400, 'User Id and Name are mandatory fields');
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
    throw new ClientError(400, 'User Id and Name are mandatory fields');
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

app.patch('/api/users', (req, res, next) => {
  let { userId, monthlyBudget, timeFrame } = req.body;
  monthlyBudget = Number.parseFloat(monthlyBudget).toFixed(2);
  if (!userId || !timeFrame) {
    throw new ClientError(400, 'User Id, Budget and Time Frame are mandatory fields');
  }
  if (!monthlyBudget) {
    throw new ClientError(400, 'Budget must be a number');
  }

  const sql = `
  update "users"
  set "monthlyBudget"= $2, "timeFrame"=$3
  where "userId" = $1
  returning *
  `;

  const params = [userId, monthlyBudget, timeFrame];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    });
});

app.patch('/api/expenses', (req, res, next) => {
  let { userId, date, expenseId, amount, spendingCategory, comment, paymentMethod } = req.body;
  amount = Number.parseFloat(amount).toFixed(2);

  if (!expenseId || !spendingCategory || !paymentMethod) {
    throw new ClientError(400, 'Expense Id, Spending Category, and Payment Method are mandatory fields');
  }
  if (!amount) {
    throw new ClientError(400, 'Amount must be a number.');
  }

  const sql = `
  update "expenses"
  set "userId"=$1, "date"= $2, "amount" = $4, "spendingCategoryId" = $5, "comment" = $6, "paymentMethodId" = $7
  where "expenseId" = $3
  returning *
  `;
  const params = [userId, date, expenseId, amount, spendingCategory, comment, paymentMethod];

  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.patch('/api/spendingCategories', (req, res, next) => {
  const { spendingCategoryId, name } = req.body;

  if (!spendingCategoryId || !name) {
    throw new ClientError(400, 'Spending Category Id and Name are mandatory fields');
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
    throw new ClientError(400, 'Name and Payment Method Id are mandatory fields');
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

app.delete('/api/expenses', (req, res, next) => {
  const { expenseId } = req.body;

  if (!expenseId) {
    throw new ClientError(400, 'Expense Id is a mandatory field');
  }

  const sql = `
  delete from "expenses"
  where "expenseId" = $1
  `;
  const params = [expenseId];

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
