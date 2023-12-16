class CategoryDataManager {
  head = [];
  values = [];

  constructor(data) {
    this.head = data[0];
    this.values = data.slice(1);
  }

  // date measure operation
  dateMeasureOperation(measureData) {
    let measuredData = [];
    let measureHead = [];

    // Add "Values" to the measureHead array

    // Iterate through each item in the 'requirement' array of measureData
    measureData.requirement.forEach((items) => measureHead.push(items));

    measureData.category.forEach((element) => {
      let findIndex = this.head.indexOf(element);
      let dataSet = this.values.map((item) => {
        return item[findIndex];
      });

      let maxVal = Math.max(...dataSet);

      let minVal = Math.min(...dataSet);

      let avgValue =
        dataSet.reduce((sum, item) => sum + item, 0) / dataSet.length;

      const standardDeviation = this.calculateStandardDeviation(dataSet);
      measuredData.push({ maxVal, minVal, avgValue, standardDeviation });
    });

    // Log the measureHead and measuredData arrays to the console
    console.log(measureHead);
    console.log(measuredData);
  }

  // calculate standard deviation
  calculateStandardDeviation(salesAmounts) {
    const n = salesAmounts.length;

    // Calculate the mean
    const mean = salesAmounts.reduce((sum, amount) => sum + amount, 0) / n;

    // Calculate the sum of squared differences
    const sumSquaredDifferences = salesAmounts.reduce(
      (sum, amount) => sum + Math.pow(amount - mean, 2),
      0
    );

    // Calculate the mean of squared differences
    const meanSquaredDifferences = sumSquaredDifferences / n;

    // Calculate the standard deviation (take the square root)
    const standardDeviation = Math.sqrt(meanSquaredDifferences);
    return standardDeviation;
  }

  // Log Date
  logData() {
    console.log(this.head);
    console.log(this.values);
  }
}

export { CategoryDataManager };
