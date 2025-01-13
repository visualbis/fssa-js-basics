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

      const maxVal = Math.max(...dataSet);

      const minVal = Math.min(...dataSet);

      const avgValue =
        dataSet.reduce((sum, item) => (item !== null ? sum + item : sum), 0) /
        dataSet.length;

      const standardDeviation = this.calculateStandardDeviation(dataSet);

      const nullCount = this.getTheNullCount(dataSet);

      const nullCountPercentage = this.getNullCountPercentage(
        nullCount,
        this.head.length,
        this.values.length
      );
      const firstQuarterValue = this.getFirstQuarterData(
        this.values,
        this.head,
        findIndex,
        "Date"
      );
      const secondQuaterValue = this.getSecondQuarterData(
        this.values,
        this.head,
        findIndex,
        "Date"
      );

      // Push the all the require data
      measuredData.push({
        maxVal,
        minVal,
        avgValue,
        standardDeviation,
        nullCount,
        nullCountPercentage,
        firstQuarterValue,
        secondQuaterValue,
      });
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

  // Find the null count
  getTheNullCount(columnData) {
    let count = 0;
    columnData.forEach((item) => {
      if (item == null) {
        count++;
      }
    });

    return count;
  }
  // Fond the null count percentage

  getNullCountPercentage(nullData, headDataLength, entireItemLength) {
    return (nullData * 100) / (headDataLength * entireItemLength);
  }

  // get quater data functions
  getFirstQuarterData(valuesData, headData, valueColumnIndex, dateColumn) {
    let quarterValue = 0;
    let dateColumnIndex = headData.indexOf(dateColumn);

    valuesData.forEach((item) => {
      let date = new Date(item[dateColumnIndex]);

      if (date.getMonth() >= 0 && date.getMonth() <= 2) {
        let value = parseFloat(item[valueColumnIndex]);
        if (!isNaN(value)) {
          quarterValue += value;
        }
      }
    });

    return quarterValue;
  }

  getSecondQuarterData(valuesData, headData, valueColumnIndex, dateColumn) {
    let quarterValue = 0;
    let dateColumnIndex = headData.indexOf(dateColumn);

    valuesData.forEach((item) => {
      // Parse the date string into a Date object
      let date = new Date(item[dateColumnIndex]);

      if (date.getMonth() >= 3 && date.getMonth() <= 5) {
        let value = parseFloat(item[valueColumnIndex]);
        if (!isNaN(value)) {
          quarterValue += value;
        }
      }
    });

    return quarterValue;
  }

  // Log Date
  logData() {
    console.log(this.head);
    console.log(this.values);
  }
}

export { CategoryDataManager };
