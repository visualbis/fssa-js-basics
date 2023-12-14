class salesManger {
  values = [];
  header = [];
  constructor(data) {
    this.header = data[0];
    this.values = data.slice(1);
  }

  // Add Group for the products
  categorizeGroup(columnName, poor, neutral) {
    let columnIndex = this.header.indexOf(columnName);

    if (columnIndex === -1) {
      console.log(`Column "${columnName}" not found.`);
      return;
    }

    this.header.push("Group", "Rank");

    let sortedRows = [...this.values];

    sortedRows.sort((a, b) => b[columnIndex] - a[columnIndex]);

    let currentRank = 1;
    let previousSales = parseInt(sortedRows[0][columnIndex]);

    sortedRows.forEach((row) => {
      if (parseInt(row[columnIndex]) < previousSales) {
        currentRank += 1;
      }

      row.push(
        parseFloat(row[columnIndex]) <= poor
          ? "Poor"
          : parseFloat(row[columnIndex]) <= neutral
          ? "Neutral"
          : "Good",
        currentRank
      );

      previousSales = row[columnIndex];
    });

    this.values = [this.header, ...sortedRows];
  }

  // Get top 5 count
  getTopFiveCount() {
    let topFiveData = this.values.slice(0, 5);
    console.log(topFiveData);
  }

  // Find the running by month
  findRunningTotalMonth() {
    let result = [];

    let uniqueProducts = [...new Set(this.values.map((row) => row[0]))];
    let uniqueMonths = [...new Set(this.values.map((row) => row[1]))];

    uniqueProducts.forEach((product) => {
      let productData = [];
      uniqueMonths.forEach((month, index) => {
        let runningTotal = 0;
        let salesAmount = 0;
        let count = 0;
        this.values.forEach((row) => {
          if (product === row[0] && count <= index) {
            runningTotal += parseInt(row[2]);
            salesAmount = parseInt(row[2]);
            count++;
          }
        });
        productData.push({
          Month: month,
          "Sales Amount": salesAmount,
          "Running Total": runningTotal,
        });
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
      console.log(`Product : ${product.product}`);
      console.log(product.data);
    });
  }
}

export { salesManger };
