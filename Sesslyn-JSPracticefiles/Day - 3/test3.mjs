import { Aggregate } from "./aggregate.mjs";
import { BillingOperator } from "./BillingOperator.mjs";

let data = [
  ["Product", "Category", "Date", "Sales", "Quantity", "Discount"],
  ["Milkybar", "Chocolate", "2023-01-01", "300", "50", "10%"],
  ["Laptop", "Technology", "2023-01-02", null, "40", "15%"],
  ["Skirt", "Clothing", "2023-01-15", "450", "80", "17%"],
  ["Necklace", "Accessories", "2023-01-13", "150", null, "9%"],
  ["Earrings", "Accessories", "2023-01-14", "300", "75", "11%"],
  ["Dairy Milk", "Chocolate", "2023-01-03", "400", "30", "20%"],
  ["Pant", "Clothing", "2023-01-20", "600", null, "15%"],
  ["Speaker", "Technology", "2023-01-04", "450", "25", "5%"],
  ["Kurta", "Clothing", "2023-01-15", "450", "80", "17%"],
  ["Cadbury", "Chocolate", "2023-01-20", null, "40", "10%"],
  ["Bangles", "Accessories", "2023-01-12", "100", "10", "22%"],
  ["Computer", "Technology", "2023-01-05", "500", "20", "12%"],
  ["Hair clip", "Accessories", "2023-01-11", "250", "15", "3%"],
  ["Tab", "Technology", "2023-01-07", "550", "35", "18%"],
  ["Shirt", "Clothing", "2023-01-20", "600", "60", null],
  ["Snikkers", "Chocolate", "2023-01-08", "600", "45", "7%"],
  ["Watch", "Accessories", "2023-01-10", "800", "70", null],
  ["Kitkat", "Chocolate", "2023-01-06", "200", "60", "8%"],
  ["Dupatta", "Clothing", "2023-01-15", "450", "80", "17%"],
  ["Tripod", "Technology", "2023-01-09", "700", "55", "14%"],
];

let columnArray = ["Sales", "Quantity", "Discount"];
const dataParser = new Aggregate(data);
const resultAggregate = dataParser.callForAggregateFn(columnArray);
console.log(resultAggregate);

//  let columnArray1 = ["Category","Quantity","Discount"];
//  const result2 =  dataParser.callForAggregateFn(columnArray1);
//   console.log(result2);

//  let columnArray3 = [];
//  const result3 =  dataParser.callForAggregateFn(columnArray3);
//   console.log(result3);

//Billing Operator
let numberOfPeoples = ['A','B','C','D'];

let billingData = [{ id: 1, billAmount: 750, paid: "A", nonEaters: "B" }, 
{ id: 2, billAmount: 4000, paid: "B", nonEaters: null },
{ id: 3, billAmount: 2500, paid: "A", nonEaters: "C, D" }
];

const billingSum = new BillingOperator(numberOfPeoples, billingData);
const resultBill = billingSum.calculateCompensation();
console.log(JSON.stringify(resultBill, null, 2));

