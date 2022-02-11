insert into "users" (
  "fullName",
  "email",
  "username",
  "hashedPassword",
  "monthlyBudget",
  "timeFrame"
) values (
  'Bob Johnson',
  'BJohnson@example.com',
  'BJohnson',
  'nsjjndid88',
  '3000',
  'Month'
);

insert into "paymentMethods" (
  "userId",
  "name"
) values (
  1,
  'Visa'
), (
  1,
  'Cash'
), (
  1,
  'MasterCard'
);

insert into "spendingCategories" (
  "name",
  "userId"
) values (
  'Groceries',
  1
), (
  'Travel',
  1
), (
  'Alcohol',
  1
), (
  'Restaurant',
  1
);


insert into "expenses" (
  "userId",
  "date",
  "amount",
  "comment",
  "spendingCategoryId",
  "paymentMethodId"
) values (
  1,
  '02-10-2022',
  13.70,
  'sample',
  1,
  1
), (
  1,
  '02-01-2022',
  100,
  'sample1',
  2,
  2
), (
  1,
  '02-08-2022',
  150,
  'sample2',
  2,
  3
),
(
  1,
  '02-04-2022',
  100,
  'sample3',
  2,
  3
),
(
  1,
  '02-08-2022',
  50,
  'sample3',
  2,
  3
)
;
