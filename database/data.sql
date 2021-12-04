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
  "amount",
  "comment",
  "spendingCategoryId",
  "paymentMethodId"
) values (
  1,
  13.70,
  'sample',
  1,
  1
);
