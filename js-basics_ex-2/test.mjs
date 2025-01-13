import { SalesDataParser } from "./dataParser2.mjs";

const data = [
  ["Product", "Sales"],
  ["Dairymilk", "800"],
  ["Milkybar", "100"],
  ["Kitkat", "200"],
  ["Chocobar", "300"],
  ["Fivestar", "200"],
  ["Cadbury", "300"],
  ["Nestle Chocs", "400"],
  ["Amul Chos", "300"],
  ["Parle Chos", "700"]
];

let groupSales = [
  { 
    value: "Poor", 
    from: 0, 
    to: 300 
  },
  { 
    value: "Neutral", 
    from: 301, 
    to: 500 
  },
  { 
    value: "Good", 
    from: 501, 
    to: 1000 
  }
];

const dataSetResult = new SalesDataParser(data);
dataSetResult.salesGroup("Sales", groupSales);
dataSetResult.logData();

const filteredByGroup = dataSetResult.filterByGroup("Poor");
console.log("Filtered by Group :", filteredByGroup);

const groupCounts = dataSetResult.getGroupCounts();
console.log("Group Counts:", groupCounts);

const topFive = dataSetResult.topFiveColumnRanking("Sales");
console.log("Top Five Product:", topFive);


let salesDataWithMonth = [
    ["Product", "Month", "Sales"],
    ["Milkybar", "January", "200"],
    ["Silk", "January", "400"],
    ["Dairy Milk", "January", "700"],
    ["Eclaires", "January", "800"],
    ["Nesley", "January", "1000"],
   
    ["Milkybar", "February", "300"],
    ["Silk", "February", "500"],
    ["Dairy Milk", "February", "800"],
    ["Eclaires", "February", "900"],
    ["Nesley", "February", "1200"],
   
    ["Milkybar", "March", "250"],
    ["Silk", "March", "450"],
    ["Dairy Milk", "March", "750"],
    ["Eclaires", "March", "850"],
    ["Nesley", "March", "100"],
   
   
    ["Milkybar", "April", "250"],
    ["Silk", "April", "450"],
    ["Dairy Milk", "April", "750"],
    ["Eclaires", "April", "850"],
    ["Nesley", "April", "100"],
   
    ["Milkybar", "May", "300"],
    ["Silk", "May", "550"],
    ["Dairy Milk", "May", "850"],
    ["Eclaires", "May", "950"],
    ["Nesley", "May", "1200"],
   
   
    ["Milkybar", "June", "350"],
    ["Silk", "June", "600"],
    ["Dairy Milk", "June", "900"],
    ["Eclaires", "June", "700"],
    ["Nesley", "June", "800"],
   
    ["Milkybar", "July", "400"],
    ["Silk", "July", "700"],
    ["Dairy Milk", "July", "800"],
    ["Eclaires", "July", "700"],
    ["Nesley", "July", "800"],
   
    ["Milkybar", "August", "500"],
    ["Silk", "August", "800"],
    ["Dairy Milk", "August", "900"],
    ["Eclaires", "August", "700"],
    ["Nesley", "August", "800"],
   
    ["Milkybar", "September", "450"],
    ["Silk", "September", "700"],
    ["Dairy Milk", "September", "800"],
    ["Eclaires", "September", "600"],
    ["Nesley", "September", "700"],
   
    ["Milkybar", "October", "600"],
    ["Silk", "October", "850"],
    ["Dairy Milk", "October", "950"],
    ["Eclaires", "October", "750"],
    ["Nesley", "October", "800"],
   
    ["Milkybar", "November", "500"],
    ["Silk", "November", "750"],
    ["Dairy Milk", "November", "850"],
    ["Eclaires", "November", "650"],
    ["Nesley", "November", "700"],
   
    ["Milkybar", "December", "550"],
    ["Silk", "December", "800"],
    ["Dairy Milk", "December", "900"],
    ["Eclaires", "December", "700"],
    ["Nesley", "December", "750"]
  ];

const dataSetRunningTotal = new SalesDataParser(salesDataWithMonth);
const runningTotal = dataSetRunningTotal.runningTotalProducts(salesDataWithMonth, "Product","Sales");
console.log("Running Total");
console.log(runningTotal);