let bill = [
    { name: "Dinesh", morning: 100, afternoon: 200, night: 50 },
    { name: "Rajesh", morning: 50, afternoon: 200, night: 70 },
    { name: "Ramesh", morning: 80, afternoon: 200, night: 0 },
];

let billPaid = [
    { name: "Dinesh", morning: 200, afternoon: 0, night: 0 },
    { name: "Rajesh", morning: 0, afternoon: 400, night: 0 },
    { name: "Ramesh", morning: 30, afternoon: 200, night: 120 },
];

let output = billFinder(bill, billPaid);
console.log(output);

function billFinder(bill, billPaid) {
    let result = [];

    for (let i = 0; i < bill.length; i++) {
        let personBill = bill[i];
        let personPaid = billPaid.find((paid) => paid.name === personBill.name);
     
        if (personPaid) {
            let totalAmountPaid =
                personPaid.morning + personPaid.afternoon + personPaid.night;
            let totalAmount = personBill.morning + personBill.afternoon + personBill.night;
            let remainingAmount = totalAmountPaid - totalAmount;
            result.push({ name: personBill.name, totalAmountPaid, remainingAmount });
        }
    }

    return result;
}
