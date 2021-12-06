// require('dotenv/config');
// const express = require('express');
// const db = require('./db');
// const errorMiddleware = require('./error-middleware');
// const staticMiddleware = require('./static-middleware');
// const ClientError = require('./client-error');

// const countDecimal = function (num) {
//   if (num.toString().split('.')[1].length > 2) {
//     return true;
//   }
// };

// const app = express();
// const jsonMiddlerware = express.json();

// app.use(staticMiddleware);

// app.use(jsonMiddlerware);

// app.get('api/expenses', (req, res, next, err) => {
//   const { userId } = req.body;

//   const sql = `
//   select *
//   from "expenses"
//   where 'userId' = $1
//   returning *
//   group by "createdAt"
//   `;
//   const params = [userId];
//   db.query(sql, params)
//     .then(result => {
//       console.log('result:', result);
//       res.status(201).json(result.rows);
//     })
//     .catch(err => next(err));
// });

// app.get('api/paymentMethods', (req, res, next, err) => {
//   const { userId } = req.body;

//   const sql = `
//   select *
//   from "paymentMethods"
//   where 'userId' = $1
//   returning *
//   group by "createdAt"
//   `;
//   const params = [userId];
//   db.query(sql, params)
//     .then(result => {
//       console.log('result:', result);
//       res.status(201).json(result.rows);
//     })
//     .catch(err => next(err));
// });

// app.get('api/spendingCategories', (req, res, next, err) => {
//   const { userId } = req.body;

//   const sql = `
//   select *
//   from "spendingCategories"
//   where 'userId' = $1
//   returning *
//   group by "createdAt"
//   `;
//   const params = [userId];
//   db.query(sql, params)
//     .then(result => {
//       console.log('result:', result);
//       res.status(201).json(result.rows);
//     })
//     .catch(err => next(err));
// });

// app.post('/api/expenses', (req, res, next, err) => {
//   const { userId, amount, spendingCategory, comment, paymentMethod } = req.body;
//   console.log('app.post req.body:', req.body);
//   if (!userId || !amount || !spendingCategory || !paymentMethod) {
//     throw new ClientError(400, 'UserId, amount, Spending Caegory, and Payment Method are mandatory fields');
//   }
//   if (countDecimal(amount) || (typeof (amount) !== 'number')) {
//     throw new ClientError(400, 'Amount must be a number with no more than 2 decimal places.');
//   }

//   const sql = `
//   insert into "expenses" ('userId', 'amount', 'spendingCategory', 'comment', 'paymentMethod')
//   values ($1, $2, $3, $4, $5)
//   returning *
//   group by "createdAt"
//   `;
//   const params = [userId, amount, spendingCategory, comment, paymentMethod];
//   db.query(sql, params)
//     .then(result => {
//       console.log('result:', result);
//       res.status(201).json(result.rows);
//     })
//     .catch(err => next(err));
// });

// app.post('/api/paymentMethods', (req, res, next, err) => {
//   const { userId, name } = req.body;
//   console.log('app.post req.body:', req.body);
//   if (!userId || !name) {
//     throw new ClientError(400, 'UserId and name are mandatory fields');
//   }
//   if (typeof (name) !== 'string')) {
//     throw new ClientError(400, 'Name must be a string.');
//   }

//   const sql = `
//   insert into "paymentMethods" ('userId', 'name')
//   values ($1, $2)
//   returning *
//   group by "createdAt"
//   `;
//   const params = [userId, name];
//   db.query(sql, params)
//     .then(result => {
//       console.log('result:', result);
//       res.status(201).json(result.rows);
//     })
//     .catch(err => next(err));
// });

// app.post('/api/spendingCategories', (req, res, next, err) => {
//   const { userId, name } = req.body;
//   console.log('app.post req.body:', req.body);
//   if (!userId || !name) {
//     throw new ClientError(400, 'UserId and name are mandatory fields');
//   }
//   if (typeof (name) !== 'string')) {
//   throw new ClientError(400, 'Name must be a string.');
// }
// const sql = `
//   insert into "spendingCategories" ('userId', 'name')
//   values ($1, $2)
//   returning *
//   group by "createdAt"
//   `;

// const params = [userId, name];
// db.query(sql, params)
//   .then(result => {
//     console.log('result:', result);
//     res.status(201).json(result.rows);
//   })
//   .catch(err => next(err));
// });

// app.patch('/api/expenses', (req, res, next, err) => {
//   const { expenseId, amount, spendingCategory, comment, paymentMethod } = req.body;
//   console.log('app.post req.body:', req.body);
//   if (!expenseId || !amount || !spendingCategory || !paymentMethod) {
//     throw new ClientError(400, 'ExpenseId, Amount, Spending Category, and Payment Method are mandatory fields');
//   }
//   if (countDecimal(amount) || (typeof (amount) !== 'number')) {
//     throw new ClientError(400, 'Amount must be a number with no more than 2 decimal places.');
//   }
//   const sql = `
//   update "expenses"
//   set 'amount' = $2, 'spendingCategory' = $3, 'comment' = $4, 'paymentMethod' = $5
//   where 'expenseId' = $1
//   returning *
//   group by "createdAt"
//   `;

//   const params = [expenseId, amount, spendingCategory, comment, paymentMethod];
//   db.query(sql, params)
//     .then(result => {
//       console.log('result:', result);
//       res.status(201).json(result.rows);
//     })
//     .catch(err => next(err));
// });

// app.patch('/api/spendingCategories', (req, res, next, err) => {
//   const { spendingCategoryId, name } = req.body;
//   console.log('app.post req.body:', req.body);
//   if (!spendingCategory || !name) {
//     throw new ClientError(400, 'SpendingCategoryId and Name are mandatory fields');
//   }
//   const sql = `
//   update "spendingCategories"
//   set 'name' = $2
//   where 'spendingCategoryId' = $1
//   returning *
//   group by "createdAt"
//   `;

//   const params = [spendingCategory, name];
//   db.query(sql, params)
//     .then(result => {
//       console.log('result:', result);
//       res.status(201).json(result.rows);
//     })
//     .catch(err => next(err));
// });

// app.patch('/api/paymentMethods', (req, res, next, err) => {
//   const { paymentMethodId, name } = req.body;
//   console.log('app.post req.body:', req.body);
//   if (!name || !paymentMethodId) {
//     throw new ClientError(400, 'Name and PaymentMethodId are mandatory fields');
//   }

//   const sql = `
//   update "paymentMethods"
//   set 'name' = $2
//   where 'paymentMethodId' = $1
//   returning *
//   group by "createdAt"
//   `;
//   const params = [paymentMethodId, name];
//   db.query(sql, params)
//     .then(result => {
//       console.log('result:', result);
//       res.status(201).json(result.rows);
//     })
//     .catch(err => next(err));
// });

// app.use(errorMiddleware);

// app.listen(process.env.PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`express server listening on port ${process.env.PORT}`);
// });
