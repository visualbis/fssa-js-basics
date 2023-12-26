class ExpensesManager {
  expensesData = [];
  constructor(data) {
    this.expenses = data;
    this.owingDetails = {};
  }

  findPaidDetails() {
    this.expenses.forEach((expense) => {
      const persons = Object.keys(expense.expenseForEachPerson);

      persons.forEach((person) => {
        const expenseAmount = expense.expenseForEachPerson[person];
        const paidAmount = expense.expensesPaid[person];

        if (expenseAmount > paidAmount) {
          this.handleOwing(person, expenseAmount - paidAmount);
        }

        if (paidAmount > expenseAmount) {
          this.handleReceiving(person, paidAmount - expenseAmount);
        }
      });
    });
  }

  handleOwing(person, amount) {
    const owingPersons = Object.keys(this.owingDetails);

    owingPersons.forEach((owingPerson) => {
      const remainingAmount = this.owingDetails[owingPerson];

      if (amount > 0 && remainingAmount > 0) {
        const transferAmount = Math.min(amount, remainingAmount);

        // Update owingDetails
        this.owingDetails[owingPerson] -= transferAmount;

        this.expensesData.push({
          receivedPerson: person,
          paidPerson: owingPerson,
          amount: transferAmount,
        });

        // Update the remaining amount to distribute
        amount -= transferAmount;
      }
    });

    // If there's still an amount to distribute, update owingDetails
    if (amount > 0) {
      this.owingDetails[person] = (this.owingDetails[person] || 0) + amount;
    }
  }

  handleReceiving(person, amount) {
    const owingPersons = Object.keys(this.owingDetails);

    owingPersons.forEach((owingPerson) => {
      const remainingAmount = this.owingDetails[owingPerson];

      if (amount > 0 && remainingAmount < 0) {
        const transferAmount = Math.min(Math.abs(remainingAmount), amount);

        // Update owingDetails
        this.owingDetails[owingPerson] += transferAmount;

        // Log the transaction
        this.expensesData.push({
          receivedPerson: owingPerson,
          paidPerson: person,
          amount: transferAmount,
        });

        // Update the remaining amount to receive
        amount -= transferAmount;
      }
    });

    // If there's still an amount to receive, update owingDetails
    if (amount > 0) {
      this.owingDetails[person] = (this.owingDetails[person] || 0) - amount;
    }
  }

  logData() {
    console.log(this.expensesData);
  }
}

export { ExpensesManager };
