const findWkNum = date => {
  date = new Date(date);
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
};

const findWkExpSum = arr => {
  if (arr) {
    const wkExpSum = 0;
    const glbDate = new Date();
    const wkNum = findWkNum(glbDate) - 1;
    for (const exp of arr) {
      const expDate = new Date(exp.date);
      if (findWkNum(expDate) === wkNum && glbDate.getFullYear() === expDate.getFullYear()) {
        return wkExpSum + (parseFloat(exp.amount).toFixed(2));
      }
    }
    return wkExpSum;
  }
};

const findMnExpSum = arr => {
  if (arr) {
    const mnExpSum = 0;
    const glbDate = new Date();

    for (const exp of arr) {
      const expDate = new Date(exp.date);
      if (expDate.getMonth() === glbDate.getMonth() && glbDate.getFullYear() === expDate.getFullYear()) {
        return mnExpSum + (parseFloat(exp.amount).toFixed(2));
      }
    }
    return mnExpSum;
  }
};

const findYrExpSum = arr => {
  if (arr) {
    const yrExpSum = 0;
    const glbDate = new Date();

    for (const exp of arr) {
      const expDate = new Date(exp.date);
      if (glbDate.getFullYear() === expDate.getFullYear()) {
        return yrExpSum + (parseFloat(exp.amount).toFixed(2));
      }
    }
    return yrExpSum;
  }
};

export const convertBudget = (timeFrame, monthlyBudget) => {
  return (!timeFrame || !monthlyBudget)
    ? 1
    : (timeFrame === 'Month')
        ? parseFloat(monthlyBudget).toFixed(2)
        : (timeFrame === 'Year')
            ? ((parseFloat(monthlyBudget)) * 12).toFixed(2)
            : ((parseFloat(monthlyBudget)) / 4.33).toFixed(2);
};

const totalSpending = (arr, timeFrame, monthlyBudget) => {
  const sum = (timeFrame === 'Month')
    ? findMnExpSum(arr)
    : (timeFrame === 'Year')
        ? findYrExpSum(arr)
        : findWkExpSum(arr);
  // eslint-disable-next-line eqeqeq
  return (sum[0] == 0)
    ? sum.slice(1)
    : sum;
};

export const functList = [
  {
    name: 'Total Spending (In Your Time Frame)',
    funct: (arr, timeFrame, monthlyBudget) => {
      const sum = (timeFrame === 'Month')
        ? findMnExpSum(arr)
        : (timeFrame === 'Year')
            ? findYrExpSum(arr)
            : findWkExpSum(arr);
      // eslint-disable-next-line eqeqeq
      return (sum[0] == 0)
        ? sum.slice(1)
        : sum;
    }
  },
  {
    name: '% of Budget Spent',
    funct: (arr, timeFrame, monthlyBudget) => {
      return parseInt((totalSpending(arr, timeFrame, monthlyBudget) / convertBudget(timeFrame, monthlyBudget)) * 100);
    }
  }

];
