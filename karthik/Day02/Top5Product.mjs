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
  
  
  export{SalesDataFilter};