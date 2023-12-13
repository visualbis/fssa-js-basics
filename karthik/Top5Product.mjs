class SalesDataFilter {
  constructor(salesData) {
    this.salesData = salesData;
    this.rankColumn = [];
  }

  addRankColumn() {
    // Assuming the sales data starts from index 1, as index 0 contains headers
    const salesIndex = 1;

    // Sort the sales data based on sales values in descending order
    const sortedData = this.salesData.slice(1).sort((a, b) => {
      return parseInt(b[salesIndex]) - parseInt(a[salesIndex]);
    });

    // Add the rank column to the top 5 products
    const top5Data = sortedData.slice(0, 5);
    top5Data.forEach((row, index) => {
      row.push(index + 1); // Rank starts from 1
    });

    // Update the rank column in the original sales data for the top 5 products
    this.salesData.forEach((row, index) => {
      if (index === 0) {
        row.push("Rank");
      } else {
        const productIndex = top5Data.findIndex((item) => item[0] === row[0]);
        row.push(productIndex !== -1 ? top5Data[productIndex][salesIndex + 1] : "");
      }
    });
  }
 printSalesData() {
    console.log(this.salesData[0]);
   for (let i = 1; i <= 5; i++) {
      const row = this.salesData.find((item) => item[item.length - 1] === i);
      if (row) {
        const rowData = [row[0], row[1], row[row.length - 1]];
        console.log(rowData);
      }
    }
  }
}


const salesData = [
  // ... (your sales data here)
  ["Product", "Sales"],
  ["Milkybar", "200"],
  ["Silk", "400"],
  ["Dairy Milk", "700"],
  ["Eclaires", "800"],
  ["Nesley", "1000"],
  ["Kitkat", "100"],
  ["Five Star", "200"],
  ["Snikkers", "500"],
  ["Munch", "300"],
  ["Perk", "400"],
  ["Center Fresh", "600"],
  ["Mint", "800"],
  ["Polo", "200"],
  ["Tictac", "400"],
  ["Gems", "100"],
  ["Kinder Joy", "900"],
  ["Marbels", "100"],
  ["Melody", "500"],
  ["Mentos", "300"],
  ["Coffee Bite", "200"],
  ["Luvit", "800"],
  ["Kopiko", "1000"],
  ["Kacha Mango", "800"],
  ["Lollipop", "1000"]
];

const salesDataFilter = new SalesDataFilter(salesData);
salesDataFilter.addRankColumn();
salesDataFilter.printSalesData();
