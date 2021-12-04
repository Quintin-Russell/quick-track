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

// app.post('/api/expenses', (req, res, err) => {
//   const { amount, spendingCategory, comment, paymentMethod } = req.body;
//   if (!amount || !spendingCategory || !paymentMethod) {
//     throw new ClientError(400, 'Please enter a valid amount, Spending Caegory, and Payment Method');
//   }
//   if (countDecimal(amount) || (typeof (amount) !== 'number')) {
//     throw new ClientError(400, 'Amount must be a number with no more than 2 decimal places.');
//   }
// });

// app.use(errorMiddleware);

// app.listen(process.env.PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`express server listening on port ${process.env.PORT}`);
// });
