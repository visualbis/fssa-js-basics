class ExpensesManager {
  expensesData = [];
  owingDetails = [];
  receivingDetails = [];

  constructor(data) {
    this.expenses = data;
  }

  findPaidDetails() {
    this.expenses.forEach((expense) => {
      const persons = Object.keys(expense.expenseForEachPerson);
      const eachExpenses = [];
      persons.forEach((person) => {
        const expenseAmount = expense.expenseForEachPerson[person];
        const paidAmount = expense.expensesPaid[person];

        if (expenseAmount > paidAmount) {
          this.handleOwing(person, expenseAmount - paidAmount, eachExpenses);
        }

        if (paidAmount > expenseAmount) {
          this.handleReceiving(
            person,
            paidAmount - expenseAmount,
            eachExpenses
          );
        }
      });
      this.expensesData.push(eachExpenses);
    });
  }

  handleOwing(person, amount, eachExpenses) {
    this.owingDetails.push({ owingPerson: person, amount: amount });

    // Iterate over receivingDetails
    let i = 0;
    while (i < this.receivingDetails.length && amount > 0) {
      const receivingPerson = this.receivingDetails[i]["receivingPerson"];
      const receivingAmount = this.receivingDetails[i]["amount"];

      this.handleReceiving(
        receivingPerson,
        receivingAmount,
        eachExpenses
      );

      if (receivingAmount <= amount) {
        this.receivingDetails.splice(i, 1);
      } else {
        this.receivingDetails[i]["amount"] -= amount;
      }

      amount -= receivingAmount;
      i++;
    }
  }

  handleReceiving(person, amount, eachExpenses) {
    let index = 0;
    while (index < this.owingDetails.length && amount > 0) {
      const owingAmount = this.owingDetails[index].amount;

      this.owingDetails[index].amount -= amount;

      const paidAmount = Math.min(owingAmount, amount);

      eachExpenses.push({
        receivedPerson: person,
        paidPerson: this.owingDetails[index].owingPerson,
        paid: paidAmount,
      });

      if (this.owingDetails[index].amount <= 0) {
        this.owingDetails.splice(index, 1);
      }

      amount -= paidAmount;
    }

    if (amount > 0) {
      this.receivingDetails.push({
        receivingPerson: person,
        amount: amount,
      });
    }
  }

  logData() {
    console.log(this.expensesData);
  }
}

export { ExpensesManager };
