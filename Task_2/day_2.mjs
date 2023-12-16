class Groupclassification {
  values  = [];
  header = [];
  salesData = [];
  constructor(salesData) {
    this.values = salesData.slice(1);
    this.header = salesData[0];
    this.salesData = salesData;
  }
// Group classification and colour marking
  categorizeSales(sales) {
    const salesValue = parseInt(sales, 10);

    if (salesValue >= 100 && salesValue <= 300) {
      return { category: "Poor", color: "Yellow" };
    } else if (salesValue > 300 && salesValue <= 500) {
      return { category: "Neutral", color: "Blue" };
    } else if (salesValue > 500 && salesValue <= 1000) {
      return { category: "Good", color: "Green" };
    } else {
      
      return { category: "Very Good", color: "Gold" };
    }
  }

  processSalesData() {
   
    const sortedData = this.salesData.slice(1).sort((a, b) => b[1] - a[1]);

    let currentRank = 1;
    let prevSales = null;

    const categorizedData = sortedData.map((row, index) => {
      const { category, color } = this.categorizeSales(row[1]);

      if (index === 0) {
        row.push("Category", "Color", "Rank");
        prevSales = row[1];
      } else {
       
        if (row[1] !== prevSales) {
          currentRank = index ;
          prevSales = row[1];
        }

        row.push(category, color, currentRank);
      }

      return row;
    });

    return categorizedData;
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

export { Groupclassification };
