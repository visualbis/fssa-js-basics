var expenseObj = [
    {
      expenseBy: {
        user: "A",
        amount: 1000
      },
      dividedBy: [
        { user: "A", amount: 100 },
        { user: "B", amount: 500 },
        { user: "C", amount: 400 }
      ]
    },
    {
      expenseBy: {
        user: "B",
        amount: 2000
      },
      dividedBy: [
        { user: "A", amount: 1000 },
        { user: "B", amount: 400 },
        { user: "C", amount: 600 }
      ]
    }
  ];
  
  function calculateShare(expense) {
    return expense.expenseBy.amount / expense.dividedBy.length;
  }
  
  function logOwes(ower, amount, payer, paidAmount) {
    console.log(`${ower} owes ${amount} in expense added by ${payer} of amount ${paidAmount}`);
  }
  
  for (let i = 0; i < expenseObj.length; i++) {
    const { user: addedBy, amount: addedAmount } = expenseObj[i].expenseBy;
    const share = calculateShare(expenseObj[i]);
  
    for (let j = 0; j < expenseObj[i].dividedBy.length; j++) {
      const { user, amount: dividedAmount, noEater } = expenseObj[i].dividedBy[j];
  
      if (!noEater) {
        const amountOwed = share - dividedAmount;
  
        if (amountOwed >= 0) {
          logOwes(user, amountOwed, addedBy, addedAmount);
        }
      }
    }
  }
  