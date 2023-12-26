import { ExpensesManager } from "./expensesManager.mjs";
const expenses = [
  // Expense 1
  {
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
      Ajay: 200,
      Gowtham: 700,
      Gokul: 400,
      Saranya: 150,
      Sesslyn: 100,
      Razak: 200,
      Mathi: 200,
      Lakshmi: 150,
      Susi: 200,
    },
  },
  // Expense 2
  {
    expenseForEachPerson: {
      Ajay: 150,
      Gowtham: 250,
      Gokul: 200,
      Saranya: 300,
      Sesslyn: 150,
      Razak: 200,
      Mathi: 100,
      Lakshmi: 50,
      Susi: 200,
    },
    expensesPaid: {
      Ajay: 100,
      Gowtham: 300,
      Gokul: 150,
      Saranya: 250,
      Sesslyn: 100,
      Razak: 150,
      Mathi: 200,
      Lakshmi: 150,
      Susi: 100,
    },
  },
  // Expense 3
  {
    expenseForEachPerson: {
      Ajay: 200,
      Gowtham: 350,
      Gokul: 120,
      Saranya: 180,
      Sesslyn: 250,
      Razak: 180,
      Mathi: 150,
      Lakshmi: 80,
      Susi: 250,
    },
    expensesPaid: {
      Ajay: 180,
      Gowtham: 400,
      Gokul: 100,
      Saranya: 150,
      Sesslyn: 200,
      Razak: 150,
      Mathi: 210,
      Lakshmi: 170,
      Susi: 200,
    },
  },
];
let expenseManager = new ExpensesManager(expenses);
expenseManager.findPaidDetails();
expenseManager.logData();
