const expenses = {
    expenseForEachPerson: {
      Ajay: 300,
      Gowtham: 400,
      Gokul: 100,
      Saranya: 200,
      Sesslyn: 400,
      Razak: 300,
      Mathi: 200,
      Lakshmi: 100,
      Susi: 300,
    },
    expensesPaid: {
      Ajay: 300,
      Gowtham: 600,
      Gokul: 400,
      Saranya: 150,
      Sesslyn: 100,
      Razak: 200,
      Mathi: 200,
      Lakshmi: 150,
      Susi: 200,
    },
  };
  
  function calculateSplit(expenses) {
    const result = {};
    const { expenseForEachPerson, expensesPaid } = expenses;
  
    for (const person in expenseForEachPerson) {
      const amountOwed = expenseForEachPerson[person] - expensesPaid[person];
      result[person] = amountOwed;
    }
  
    return result;
  }
  
  const splitBills = calculateSplit(expenses);
  console.log("Split Bills:");
  for (const person in splitBills) {
    console.log(`${person}: ${splitBills[person]}`);
  }
  