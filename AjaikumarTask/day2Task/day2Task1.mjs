class DataGroup {
    header = [];
    values = [];
  
    constructor(salesData) {
      this.header = salesData[0];
      this.values = salesData.slice(1);
    }
  
    categoryFinder(n, category) {
      this.header.push("Grade", "Rank");
      let salesData = this.values;
        salesData.slice(1).sort((a, b) => b[1] - a[1]).forEach((row, index, array) => {
        let salesAmount = parseInt(row[1]);
        if (salesAmount <= category[0]["to"]) {
          row.push("Poor");
        } else if (salesAmount > category[1]["from"] && salesAmount <= category[1]["to"]) {
          row.push("Neutral");
        } else if (salesAmount > category[2]["from"] && salesAmount <= category[2]["to"]) {
          row.push("Good");
        } 
  
        if (index > 0 && salesAmount === parseInt(array[index - 1][1])) {
          row.push(array[index - 1][3]);
        } else {
          row.push(index + 1);
        }
      });
  
      console.log("Sort by Rank");
      salesData.slice(1).sort((a, b) => a[3] - b[3]).forEach((row) => {
        console.log(row);
      });
      console.log("Top 5 Rank");
      let value =   this.values.sort((a, b) => a[3] - b[3]).slice(1,6);
      console.log(value);
    }

    runningTotalFinder() {
      let result = [];
  
      let uniqueProducts = [...new Set(this.values.map((row) => row[0]))];
      let uniqueMonths = [...new Set(this.values.map((row) => row[1]))];
  
      uniqueProducts.forEach((product) => {
        let productData = [];
        uniqueMonths.forEach((month, index) => {
          let runningTotal = 0;
          let count = 0;
          this.values.forEach((row) => {
            if (product === row[0] && count <= index) {
              runningTotal += parseInt(row[2]);
              count++;
            }
          });
          productData.push([month, runningTotal]);
        });
        result.push({ product, data: productData });
      });
      this.values = result;
    }
  
    // Show the data
    logData() {
      console.log(this.values);
    }
  
    showRunningTotal() {
      this.values.forEach((product) => {
        console.log(`Product: ${product.product}`);
        product.data.forEach((entry) => {
          console.log(`  ${entry[0]}: ${entry[1]}`);
        });
      });
    }
  }
    

  
  export { DataGroup };
  