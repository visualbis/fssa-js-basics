class BillingOperator {
  countOfPeoples = 0;
  billingData = [];
  resultPeople = [];

  constructor(numberOfPeoples, billingData) {
    this.resultPeople = numberOfPeoples.map((person) => ({ name: person }));
    this.countOfPeoples = numberOfPeoples.length;
    this.billingData = billingData;
  }

  findIndividualShare() { 
    this.billingData.forEach((eachBill) => {
      let billAmount = eachBill.billAmount;
      let nonEaters = 0;
      if (eachBill.nonEaters !== null) {
        nonEaters = eachBill.nonEaters
          ? eachBill.nonEaters.split(",").map((name) => name.trim())
          : eachBill.nonEaters;
      }
      let noOfEaters = this.countOfPeoples;
      if (nonEaters !== 0) {
        noOfEaters = this.countOfPeoples - nonEaters.length;
      }

      let eachPersonBill = billAmount / noOfEaters;
      this.resultPeople.forEach((people) => {
        if (nonEaters.length > 0 && nonEaters.includes(people.name)) {
          people[eachBill.id] = 0;
        } else {
          people[eachBill.id] = eachPersonBill;
        }
      });
    });
  }

  totalInidividualShare() {
    this.resultPeople.forEach((totalShare) => {
      let total = Object.values(totalShare).reduce((acc, value) => {
        return typeof value === "number" ? acc + value : acc;
      }, 0);
      totalShare.totalExpenses = total;
    });
  }

  minusPaidPeopleShare() {
    this.billingData.forEach((eachBill) => {
      let paidPerson = eachBill.paid;
      let amountPaid = eachBill.billAmount;

      this.resultPeople.forEach((totalShare) => {
        if (totalShare.name === paidPerson) {
          totalShare.totalExpenses -= amountPaid;
        }
      });
    });
  }

  calculateCompensation() {
    this.findIndividualShare();
    this.totalInidividualShare();
    this.minusPaidPeopleShare();
    this.logData();

    const compensationData = [];

    this.resultPeople.forEach((receiver) => {
      const receiverName = receiver.name;
      if (receiver.totalExpenses < 0) {
        const receiverData = {
          receiver: receiverName,
          payers: [],
        };

        let remainingExpenses = receiver.totalExpenses;

        this.resultPeople.forEach((payer) => {
          const payerName = payer.name;
          if (payer.totalExpenses > 0) {
            let payingAmount = Math.min(
              payer.totalExpenses,
              -remainingExpenses
            ); 

            if (payingAmount !== 0) {
              receiverData.payers.push({
                payer: payerName,
                payingAmount: payingAmount,
              });
            }
            payer.totalExpenses -= payingAmount;
            remainingExpenses += payingAmount;
          }
        });

        compensationData.push(receiverData);
      }
    });

    return compensationData;
  }

  logData(){
    console.log(this.resultPeople);
  }
}

export { BillingOperator };
