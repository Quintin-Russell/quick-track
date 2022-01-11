import dayjs from 'dayjs';

const sameWeek = exp => {
  const glbDate = new Date();
  const expDate = new Date(exp.date);
  return !!((dayjs(glbDate.toString()).isSame(exp.date, 'week') && glbDate.getFullYear() === expDate.getFullYear()));
};

const sameMonth = exp => {
  const glbDate = new Date();
  const expDate = new Date(exp.date);
  return !!((expDate.getMonth() === glbDate.getMonth() && glbDate.getFullYear() === expDate.getFullYear()));
};

const sameYear = exp => {
  const glbDate = new Date();
  const expDate = new Date(exp.date);
  return !!(glbDate.getFullYear() === expDate.getFullYear());
};

const findWkExpSum = arr => {
  if (arr) {
    let wkExpSum = 0;
    for (const exp of arr) {
      if (sameWeek(exp)) {
        const wkAmt = parseFloat(exp.amount);
        wkExpSum += wkAmt;
      }
    }
    return wkExpSum;
  }
};

const findMnExpSum = arr => {
  if (arr) {
    let mnExpSum = 0;
    for (const exp of arr) {
      if (sameMonth(exp)) {
        mnExpSum += (parseFloat(exp.amount));
      }
    }
    return mnExpSum;
  }
};

const findYrExpSum = arr => {
  if (arr) {
    let yrExpSum = 0;
    for (const exp of arr) {
      if (sameYear(exp)) {
        yrExpSum += (parseFloat(exp.amount));
      }
    }
    return yrExpSum;
  }
};

export const convertBudget = (timeFrame, monthlyBudget) => {
  return (!timeFrame || !monthlyBudget)
    ? 1
    : (timeFrame === 'Month')
        ? parseFloat(monthlyBudget)
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

export const setAllCategoryColGraphInfo = (arr, timeFrame, budget) => {
  const graphObj = {
    unitSpending: [],
    totalSpending: [0],
    budgetArr: [],
    xaxis: []
  };
  let totalSpendingSum = 0;
  const glbDate = new Date();
  if (timeFrame === 'Month') {
    const budgetRepeat = glbDate.getDate();
    for (let x = 1; x <= budgetRepeat; x++) {
      graphObj.budgetArr.push(convertBudget(timeFrame, budget));
    }
    for (const exp of arr) {
      if (sameMonth(exp)) {
        const amount = parseFloat(exp.amount);
        graphObj.unitSpending.push(amount);
        totalSpendingSum += amount;
        graphObj.totalSpending.push(totalSpendingSum);
        graphObj.xaxis.push(exp.date);
      }
    }
  } else if (timeFrame === 'Week') {
    const dailySpendingArr = [0, 0, 0, 0, 0, 0, 0];
    for (let x = 0; x < dailySpendingArr.length; x++) {
      graphObj.budgetArr.push(convertBudget(timeFrame, budget));
    }
    graphObj.xaxis = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    for (const exp of arr) {
      if (sameWeek(exp)) {
        const expDay = new Date(exp.date).getDay();
        const amount = parseFloat(exp.amount);
        dailySpendingArr[expDay] += amount;
      }
    }
    for (const day of dailySpendingArr) {
      totalSpendingSum += day;
      graphObj.totalSpending.push(totalSpendingSum);
    }
    graphObj.unitSpending = dailySpendingArr;
  } else if (timeFrame === 'Year') {
    for (let x = 0; x <= 11; x++) {
      graphObj.budgetArr.push(convertBudget(timeFrame, budget));
    }
    graphObj.xaxis = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const mnArr = [];
    let yrTotalSpending = 0;
    for (const exp of arr) {
      const expDate = new Date(exp.date);
      const amount = parseFloat(exp.amount);
      if (sameYear(exp)) {
        if (mnArr[expDate.getMonth()]) {
          mnArr[expDate.getMonth()].push(amount);
        } else {
          mnArr.push([amount]);
        }
      } else {
        continue;
      }
    }
    for (const mn of mnArr) {
      const mnSum = findMnExpSum(mn);
      graphObj.unitSpending.push(mnSum);
      yrTotalSpending += mnSum;
      graphObj.totalSpending.push(yrTotalSpending);
    }
  }
  return graphObj;
};

export const setCategoryGraphInfo = (expArr, timeFrame, budget, graph) => {
  const graphArr = expArr.filter(exp => exp.spendingCategoryId === parseInt(graph));
  if (graphArr) {
    return setAllCategoryColGraphInfo(graphArr, timeFrame, budget);
  }
};

export const setDonutInfo = (categoryArr, categoryId, expArr, timeFrame) => {
  const graphObj = {
    categories: [],
    values: []
  };
  for (const cat of categoryArr) {
    let categorySum = 0;
    const catId = cat[categoryId];
    for (const exp of expArr) {
      if (parseInt(exp[categoryId]) === catId) {
        if ((timeFrame === 'Month') && (sameMonth(exp))) {
          categorySum += parseFloat(exp.amount);
        } else if ((timeFrame === 'Year') && (sameYear(exp))) {
          categorySum += parseFloat(exp.amount);
        } else if ((timeFrame === 'Week') && (sameWeek(exp))) {
          categorySum += parseFloat(exp.amount);
        }
      }
    }
    graphObj.categories.push(cat.name);
    graphObj.values.push(categorySum);
  }
  return graphObj;
};

export const budgetPercent = (arr, timeFrame, monthlyBudget) => {
  return parseInt((totalSpending(arr, timeFrame, monthlyBudget) / convertBudget(timeFrame, monthlyBudget)) * 100);
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
  }
];
