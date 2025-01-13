class SalesManger {
  values = [];
  header = [];
  constructor(data) {
    this.header = data[0];
    this.values = data.slice(1);
  }

  // Add Group for the products
  categorizeGroup(columnName, categrazeFormat) {
    let columnIndex = this.header.indexOf(columnName);

    if (columnIndex === -1) {
      throw new Error(`Column "${columnName}" not found.`);
      return;
    }

    this.header.push("Group", "Rank");

    const sortedRows = [...this.values];

    sortedRows.sort((a, b) => b[columnIndex] - a[columnIndex]);

    let currentRank = 1;
    let previousSales = parseInt(sortedRows[0][columnIndex]);

    sortedRows.forEach((row) => {
      if (parseInt(row[columnIndex]) < previousSales) {
        currentRank += 1;
      }

      row.push(
        parseFloat(row[columnIndex]) <= categrazeFormat[0]["to"]
          ? "Poor"
          : parseFloat(row[columnIndex]) <= categrazeFormat[1]["to"]
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
    const topFiveData = this.values.slice(0, 5);
    console.log(topFiveData);
  }

  // Find the running by month
  findRunningTotalMonth() {
    let result = [];

    let uniqueProducts = new Set();
    this.values.forEach((row) => uniqueProducts.add(row[0]));
    let uniqueMonths = new Set();
    this.values.forEach((row) => uniqueMonths.add(row[1]));

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

export { SalesManger };
