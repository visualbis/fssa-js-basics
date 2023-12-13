import { DataParser2 } from "./DataParser2.mjs";

let data = [
  ["Product", "Sales"],
  ["Milkybar", "200"],
  ["Silk", "400"],
  ["Dairy Milk", "600"],
  ["Eclaires", "800"],
  ["Nesley", "1000"],
  ["Kitkat", "100"],
  ["Five Star", "800"],
  ["Snikkers", "500"],
  ["Munch", "700"],
  ["Perk", "900"],
  ["Center Fresh", "200"],
  ["Mint", "400"],
  ["Polo", "600"],
  ["Tictac", "300"],
  ["Gems", "500"],
];

 
let productData = [
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
 

let groupColumn = [
  { value: "Poor", from: "0", to: "300" },
  { value: "Netural", from: "301", to: "700" },
  { value: "Good", from: "701", to: "1000" },
];

//Add Group By column
const dataParser = new DataParser2(data);
console.log("Add new column using group by");
dataParser.groupTheColumn("Sales", groupColumn);
dataParser.logData();

//Filter based on the column
const resultFilter = dataParser.filterColumn("Group By", "Good");
console.log("Filter by category");
console.log(resultFilter);

//Count based on the category
const resultCount = dataParser.countColumn("Group By");
console.log();
console.log("Count by category");
console.log(resultCount);

//Top 5 rank based on the column
const resultRank = dataParser.rankTheColumn("Sales");
console.log("Top 5 Rank");
console.log(resultRank);

//Running Total
const runningTotal = dataParser.runningTotal(productData, "Product","Sales");
console.log("Running Total");
console.log(runningTotal);
