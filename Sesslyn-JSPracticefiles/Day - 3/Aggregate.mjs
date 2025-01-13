class Aggregate {
  header = [];
  values = [];
  resultHeader = [
    "Measures", "Sum", "Average", "Maximum", "Minimum", "Standard Deviation", "Q1", "Q2", "Q3", "Null Field", "% of Null field", "Count without null",
  ];
  resultValues = [];

  constructor(data) {
    this.header = data[0];
    this.values = data.slice(1);
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
      this.findQuartiles(column);
      this.findCountWithAndWithoutNull(column);
    });
    return [this.resultHeader, this.resultValues];
  }

  addColumn(sourceColumn) {
    const sourceColumnLower = sourceColumn.toLowerCase();
    let measureColumn = this.resultValues.findIndex((row) => row[0].toLowerCase() === sourceColumnLower);
    if (measureColumn === -1) {
      this.resultValues.push([sourceColumn]);
      measureColumn = this.resultValues.length - 1;
    }
    return measureColumn;
  }

  findSum(sourceColumn) {
    const sourceColumnIndex = this.addColumn(sourceColumn);
    const index = this.findIndex(sourceColumn, this.header);
    let sumResult = 0;
    
    this.values.forEach((originalData) => {
      if (originalData && originalData[index] !== null) {
        console.log(originalData);
        sumResult += parseInt(originalData[index]);
      }
    });
    const indexOfAggregateFn = this.findIndex("Sum", this.resultHeader);
    this.resultValues[sourceColumnIndex][indexOfAggregateFn] = sumResult;
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

    const indexOfAggregateFn = this.findIndex("Average", this.resultHeader);
    this.resultValues[sourceColumnIndex][indexOfAggregateFn] = parseFloat(averageResult.toFixed(2));
  }

  findMaximum(sourceColumn) {
    const sourceColumnIndex = this.addColumn(sourceColumn);
    const index = this.findIndex(sourceColumn, this.header);
    const maxResult = this.values.reduce((max, originalData) => {
      return originalData && originalData[index] !== null ? Math.max(max, parseInt(originalData[index])) : max;
    }, -Infinity);

    const indexOfAggregateFn = this.findIndex("Maximum", this.resultHeader);
    this.resultValues[sourceColumnIndex][indexOfAggregateFn] = maxResult;
  }

  findMinimum(sourceColumn) {
    const sourceColumnIndex = this.addColumn(sourceColumn);
    const index = this.findIndex(sourceColumn, this.header);
    const minResult = this.values.reduce((min, originalData) => {
      return originalData && originalData[index] !== null ? Math.min(min, parseInt(originalData[index])) : min;
    }, Infinity);

    const indexOfAggregateFn = this.findIndex("Minimum", this.resultHeader);
    this.resultValues[sourceColumnIndex][indexOfAggregateFn] = minResult;
  }

  findStandardDeviation(sourceColumn) {
    const sourceColumnIndex = this.addColumn(sourceColumn);
    const index = this.findIndex(sourceColumn, this.header);

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

    const mean = sumResult / countWithoutNull ;
    const variance = sumSquaredDiff / countWithoutNull - mean ** 2 ;
    const standardDeviation = Math.sqrt(variance);

    const indexOfAggregateFn = this.findIndex("Standard Deviation", this.resultHeader);
    this.resultValues[sourceColumnIndex][indexOfAggregateFn] = parseFloat(standardDeviation.toFixed(2));
  }

  calculateMedian(values) {
    const sortedValues = values.sort((a, b) => a - b);
    const length = sortedValues.length;
    const middle = Math.floor(length / 2);

    if (length % 2 === 0) {
      return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
    } else {
      return sortedValues[middle];
    }
  }

  findQuartiles(sourceColumn) {
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

    const indexOfAggregateFn = this.findIndex("Count without null", this.resultHeader);
    this.resultValues[sourceColumnIndex][indexOfAggregateFn] = countWithoutNull;

    const indexOfAggregateFnForNull = this.findIndex("Null Field", this.resultHeader);
    this.resultValues[sourceColumnIndex][indexOfAggregateFnForNull] = countOfNullField;

    const indexOfAggregateFnForNullPercent = this.findIndex("% of Null field", this.resultHeader);
    this.resultValues[sourceColumnIndex][indexOfAggregateFnForNullPercent] = parseFloat(percentageOfNullField.toFixed(2));
  }
}

export { Aggregate };
