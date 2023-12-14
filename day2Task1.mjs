class DataGroup {
    header = [];
    values = [];
  
    constructor(salesData) {
      this.header = salesData[0];
      this.values = salesData.slice(1);
    }
  
    CategeoryFinder(n) {
      this.header.push("Grade", "Rank");
      let salesData = this.values;
        salesData.slice(1).sort((a, b) => b[1] - a[1]).forEach((row, index, array) => {
        let salesAmount = parseInt(row[1]);
        if (salesAmount < 300) {
          row.push("Poor");
        } else if (salesAmount >= 300 && salesAmount < 500) {
          row.push("Neutral");
        } else if (salesAmount >= 500 && salesAmount < 1000) {
          row.push("Good");
        } else if (salesAmount >= 1000) {
          row.push("Very Good");
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
}
  
  export { DataGroup };
  