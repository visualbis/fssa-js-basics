class Groupclassification {
  constructor(salesData) {
    this.salesData = salesData;
  }

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
}

export { Groupclassification };
