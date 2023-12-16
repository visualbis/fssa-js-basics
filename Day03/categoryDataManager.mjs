class CategoryDataManager {
  head = [];
  values = [];

  constructor(data) {
    this.head = data[0];
    this.values.slice(0);
  }

  // date measure operation
  dateMeasureOperation(measureData) {
    let measuredData = [];
    let measureHead = [];

    // Add "Values" to the measureHead array
    measureHead.push("Values");

    // Iterate through each item in the 'requirement' array of measureData
    measureData.requirement.forEach((items) => measureHead.push(items));

    measureData.category.forEach((element) => {
      console.log(element);
      let findIndex = this.head.indexOf(element);

      let dataSet = this.values.map((item) => {
        console.log("Hello there!  ");
        return item[findIndex];
      });


      let maxVal = Math.max(...dataSet);
      console.log(maxVal);

      let minVal = Math.min(...dataSet);
      console.log(minVal);

      let avgValue =
        dataSet.reduce((sum, item) => sum + item, 0) / dataSet.length;
      console.log(avgValue);

      measuredData.push(maxVal + " " + minVal + " " + avgValue);

      //const standardDeviation = this.calculateStandardDeviation(dataSet);
      // measuredData.push(standardDeviation);
    });

    // Log the measureHead and measuredData arrays to the console
    // console.log(measureHead);
    //  console.log(measuredData);
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
    console.log(standardDeviation);
    return standardDeviation;
  }

  // Log Date
  logData() {
    console.log(this.head);
    console.log(this.values);
  }
}

export { CategoryDataManager };
