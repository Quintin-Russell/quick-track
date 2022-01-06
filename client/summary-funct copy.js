const findWkNum = date => {
  date = new Date(date);
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
};

export const findWkExpSum = arr => {
  if (arr) {
    const wkExpSum = 0;
    const glbDate = new Date();
    const wkNum = findWkNum(glbDate);
    for (const exp of arr) {
      const expDate = new Date(exp.date);
      if (findWkNum(exp.date) === wkNum && glbDate.getFullYear() === expDate.getFullYear()) {
        return wkExpSum + (parseFloat(exp.amount).toFixed(2));
      }
    }
    return wkExpSum;
  }
};

export const findMnExpSum = arr => {
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

export const findYrExpSum = arr => {
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

export const determineBudget = (arr, timeFrame, monthlyBudget) => {
  return (timeFrame === 'Month')
    ? findMnExpSum(arr)
    : (timeFrame === 'Year')
        ? findYrExpSum(arr)
        : findWkExpSum(arr);
};

export const findBudgetPercent = (arr, timeFrame, monthlyBudget) => {
  return parseInt((determineBudget(arr, timeFrame, monthlyBudget) / convertBudget(timeFrame, monthlyBudget)) * 100);
};

export const statsFunctArr = [
  {
    name: 'Total Spending (in time period)',
    funct: determineBudget()
  }
];
