class Grouping{
    values = [];
    header = [];

    constructor(salesData){
        this.values = salesData;
        this.header = salesData.slice(1);
    }

  // Task 1 - A function is identifing the whether the product is poor, neutral, good.
    categorizeProduct(columnName, groups) {
      let columnIndex = this.values[0].indexOf(columnName);

      if (columnIndex === -1) {
          console.log(`Column "${columnName}" not found.`);
          return;
      }

      groups.forEach(group => {
          this.values[0].push(group.group);

          this.values.slice(1).forEach((row) => {
              const sales = parseInt(row[columnIndex]);
              if (sales >= group.from && sales <= group.to) {
                  row.push(group.group);
              }
          });
      });
  }

  // Task 2 - Add a new column for "Rank" based on sales amount
  addRankColumn() {
      const salesColumnIndex = this.values[0].indexOf("Sales");

      if (salesColumnIndex === -1) {
          console.log("Sales column not found.");
          return;
      }

      const salesData = this.values.slice(1).map(row => parseInt(row[salesColumnIndex]));
      const sortedSales = salesData.slice().sort((a, b) => b - a);

      this.values[0].push("Rank");

      this.values.slice(1).forEach((row) => {
          const sales = parseInt(row[salesColumnIndex]);
          const rank = sortedSales.indexOf(sales) + 1;
          row.push(rank);
      });

      // Sort the data based on the "Rank" column
      let columnIndex = this.values[0].indexOf("Rank");
      this.values = this.values.slice(1).sort((a, b) => a[columnIndex] - b[columnIndex]);
  }

  // Task 3 - Filter the top N values based on the "Rank" column
  filterTopNRanks(n) {
    let columnIndex = this.values[0].indexOf("Rank");
    let filterTopNRanksData = this.values.slice(0, n);
    console.log(filterTopNRanksData);
  }

  logData() {
      console.log(this.values);
  }

    // Task 4 - Find the running by month
  findRunningByTotalMonth() {
    let result = [];
    //console.log(this.values);
    let uniqueProducts = [...new Set(this.values.map((row) =>{
    console.log(row)
    } ))];
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

    // Task 5 - Showing Running Total
  showRunningTotal() {
    this.values.forEach((product) => {
      console.log(`Product: ${product.product}`);
      product.data.forEach((entry) => {
        console.log(`  ${entry[0]}: ${entry[1]}`);
      });
    });
  }
}

export {Grouping};