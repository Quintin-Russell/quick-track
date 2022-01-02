drop schema "public" cascade;
create schema "public";
CREATE TABLE "users" (
	"userId" serial NOT NULL,
	"fullName" TEXT NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"monthlyBudget" decimal NOT NULL,
  "timeFrame" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "expenses" (
	"expenseId" serial NOT NULL,
	"userId" integer NOT NULL,
  "date" TEXT NOT NULL,
	"amount" decimal NOT NULL,
	"comment" TEXT,
	"spendingCategoryId" integer,
	"paymentMethodId" integer,
	"createdAt" timestamptz NOT NULL default now(),
	CONSTRAINT "expenses_pk" PRIMARY KEY ("expenseId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "spendingCategories" (
	"spendingCategoryId" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	"userId" integer NOT NULL,
	CONSTRAINT "spendingCategories_pk" PRIMARY KEY ("spendingCategoryId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "paymentMethods" (
	"paymentMethodId" serial NOT NULL,
	"userId" integer NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	CONSTRAINT "paymentMethods_pk" PRIMARY KEY ("paymentMethodId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_fk1" FOREIGN KEY ("spendingCategoryId") REFERENCES "spendingCategories"("spendingCategoryId");
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_fk2" FOREIGN KEY ("paymentMethodId") REFERENCES "paymentMethods"("paymentMethodId");
ALTER TABLE "spendingCategories" ADD CONSTRAINT "spendingCategories_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "paymentMethods" ADD CONSTRAINT "paymentMethods_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
