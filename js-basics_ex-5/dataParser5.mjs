class DataParser3 {
  header = [];
  values = [];
  resultHeader = [
    "Measures", "Sum", "Average", "Maximum", "Minimum", "Standard Deviation", "Q1", "Q2", "Q3", "Null Field", "% of Null field", "Count without null",
  ];
  resultValues = [];

  constructor(data) {
    [this.header, ...this.values] = data;
  }

  findIndex = (sourceColumn, arrayToFind) => {
    const index = arrayToFind.indexOf(sourceColumn);
    if (index === -1) {
      throw new Error(`Column ${sourceColumn} not found`);
    }
    return index;
  };

  findNumberColumns(columnArray) {
    if (columnArray.length === 0) {
      columnArray = this.header;
    }
    return columnArray.filter((column) => {
      const columnIndex = this.header.indexOf(column);
      return columnIndex !== -1 && this.values.some((row) => row && !isNaN(row[columnIndex]));
    });
  }

  callForAggregateFn(columnArray) {
    const numberColumns = this.findNumberColumns(columnArray);
    if (numberColumns.length === 0) {
      throw new Error("There is no valid number column in your initial data");
    }

    numberColumns.forEach((column) => {
      this.findSum(column);
      this.findAverage(column);
      this.findMaximum(column);
      this.findMinimum(column);
      this.findStandardDeviation(column);
      this.calculateQuartiles(column);
      this.findCountWithAndWithoutNull(column);
    });

    return [this.resultHeader, this.resultValues];
  }

  addColumn(sourceColumn) {
    const sourceColumnLower = sourceColumn.toLowerCase();
    const measureColumn = this.resultValues.findIndex((row) => row[0].toLowerCase() === sourceColumnLower);

    if (measureColumn === -1) {
      this.resultValues.push([sourceColumn]);
    }

    return measureColumn !== -1 ? measureColumn : this.resultValues.length - 1;
  }

  findSum(sourceColumn) {
    const sourceColumnIndex = this.addColumn(sourceColumn);
    const index = this.findIndex(sourceColumn, this.header);
    const sumResult = this.values.reduce((sum, originalData) => (
      originalData && originalData[index] !== null ? sum + parseInt(originalData[index]) : sum
    ), 0);

    this.resultValues[sourceColumnIndex][this.findIndex("Sum", this.resultHeader)] = sumResult;
  }

  findAverage(sourceColumn) {
    const sourceColumnIndex = this.addColumn(sourceColumn);
    const index = this.findIndex(sourceColumn, this.header);
    let sumResult = 0;
    let countWithoutNull = 0;

    this.values.forEach((originalData) => {
      if (originalData && originalData[index] !== null) {
        sumResult += parseInt(originalData[index]);
        countWithoutNull++;
      }
    });

    const averageResult = countWithoutNull !== 0 ? sumResult / countWithoutNull : 0;
    this.resultValues[sourceColumnIndex][this.findIndex("Average", this.resultHeader)] = parseFloat(averageResult.toFixed(2));
  }

  findMaximum(sourceColumn) {
    const sourceColumnIndex = this.addColumn(sourceColumn);
    const index = this.findIndex(sourceColumn, this.header);
    const maxResult = this.values.reduce((max, originalData) => (
      originalData && originalData[index] !== null ? Math.max(max, parseInt(originalData[index])) : max
    ), -Infinity);

    this.resultValues[sourceColumnIndex][this.findIndex("Maximum", this.resultHeader)] = maxResult;
  }

  findMinimum(sourceColumn) {
    const sourceColumnIndex = this.addColumn(sourceColumn);
    const index = this.findIndex(sourceColumn, this.header);
    const minResult = this.values.reduce((min, originalData) => (
      originalData && originalData[index] !== null ? Math.min(min, parseInt(originalData[index])) : min
    ), Infinity);

    this.resultValues[sourceColumnIndex][this.findIndex("Minimum", this.resultHeader)] = minResult;
  }

  findStandardDeviation(sourceColumn) {
    const sourceColumnIndex = this.addColumn(sourceColumn);
    const index = this.findIndex(sourceColumn, this.header);

    const { mean, variance, standardDeviation } = this.calculateStandardDeviation(index);
 
    this.resultValues[sourceColumnIndex][this.findIndex("Standard Deviation", this.resultHeader)] = parseFloat(standardDeviation.toFixed(2));
  }

  calculateStandardDeviation(index) {
    let sumResult = 0;
    let sumSquaredDiff = 0;
    let countWithoutNull = 0;

    this.values.forEach((originalData) => {
      if (originalData && originalData[index] !== null) {
        const currentValue = parseInt(originalData[index]);
        sumResult += currentValue;
        sumSquaredDiff += currentValue * currentValue;
        countWithoutNull++;
      }
    });

    const mean = sumResult / countWithoutNull;
    const variance = sumSquaredDiff / countWithoutNull - mean ** 2;
    const standardDeviation = Math.sqrt(variance);

    return { mean, variance, standardDeviation };
  }

  calculateMedian(values) {
    const sortedValues = values.sort((a, b) => a - b);
    const length = sortedValues.length;
    const middle = Math.floor(length / 2);

    return length % 2 === 0
      ? (sortedValues[middle - 1] + sortedValues[middle]) / 2
      : sortedValues[middle];
  }

  calculateQuartiles(sourceColumn) {
    const sourceColumnIndex = this.addColumn(sourceColumn);
    const index = this.findIndex(sourceColumn, this.header);

    const sortedValues = this.values
      .map((originalData) => (originalData && originalData[index] !== null ? parseInt(originalData[index]) : null))
      .filter((value) => value !== null)
      .sort((a, b) => a - b);

    const length = sortedValues.length;
    const q1Index = Math.floor(length / 4);
    const q2Index = Math.floor(length / 2);
    const q3Index = Math.floor((3 * length) / 4);

    this.resultValues[sourceColumnIndex][this.findIndex("Q1", this.resultHeader)] = this.calculateMedian(sortedValues.slice(0, q1Index));
    this.resultValues[sourceColumnIndex][this.findIndex("Q2", this.resultHeader)] = this.calculateMedian(sortedValues.slice(q1Index, q2Index));
    this.resultValues[sourceColumnIndex][this.findIndex("Q3", this.resultHeader)] = this.calculateMedian(sortedValues.slice(q2Index, q3Index));
  }

  findCountWithAndWithoutNull(sourceColumn) {
    const sourceColumnIndex = this.addColumn(sourceColumn);
    const index = this.findIndex(sourceColumn, this.header);
    let countWithoutNull = 0;
    let countOfNullField = 0;

    this.values.forEach((originalData) => {
      if (originalData && originalData[index] !== null) {
        countWithoutNull++;
      } else {
        countOfNullField++;
      }
    });

    const totalRowCount = this.values.length;
    const percentageOfNullField = (countOfNullField / totalRowCount) * 100;

    this.resultValues[sourceColumnIndex][this.findIndex("Count without null", this.resultHeader)] = countWithoutNull;
    this.resultValues[sourceColumnIndex][this.findIndex("Null Field", this.resultHeader)] = countOfNullField;
    this.resultValues[sourceColumnIndex][this.findIndex("% of Null field", this.resultHeader)] = parseFloat(percentageOfNullField.toFixed(2));
  }
}

export { DataParser3 };
