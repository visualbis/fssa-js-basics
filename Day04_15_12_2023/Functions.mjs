class Functions {

    getColumnValues(data, columnName) {
        const headerIndex = data[0].indexOf(columnName);
     
        if (headerIndex === -1) {
         throw new Error(`Column not found: ${columnName}`);
        }
     
        return data.slice(1).map(row => parseFloat(row[headerIndex]) || null);
    }
     
    // Task 1: Calculate sum of the specified column
    calculateSum(columnValues) {
        return columnValues.reduce((acc, value) => acc + (value || 0), 0);
    }
    
    // Task 2: Calculate Average of the specified column
    calculateAverage(columnValues) {
        const sum = this.calculateSum(columnValues);
        return sum / columnValues.length;
    }
    
    // Task 3: Calculate Minimum value of the specified column
    calculateMin(columnValues) {
        return Math.min(...columnValues.filter(value => value !== null));
    }
    
    // Task 4: Calculate Maximum value of the specified column
    calculateMax(columnValues) {
        return Math.max(...columnValues.filter(value => value !== null));
    }
    
    // Task 5: Calculate the standard deviation in the specified column
    calculateStandardDeviation(columnValues) {
        const mean = this.calculateAverage(columnValues);
        const squaredDifferences = columnValues
            .filter(value => value !== null)
            .map(value => Math.pow(value - mean, 2));
        const variance = this.calculateAverage(squaredDifferences);
        const standardDeviation = Math.sqrt(variance);
        return standardDeviation;
    }

    // Task 6: Calculate no of null value in the specified column
    calculateCountNullValues(columnValues) {
        return columnValues.filter(value => value === null).length;
    }

    // Task 7: Calculate null percentage in the specified column
    calculateNullPercentage(columnValues) {
        const nullCount = columnValues.filter(value => value === null).length;
        const totalValues = columnValues.length;
        if (totalValues === 0) {
            return 0;
        }
        const nullPercentage = (nullCount / totalValues) * 100;
        return nullPercentage;
    }
    
    // Calculate Median
    calculateMedian(sortedValues) {
        const midIndex = Math.floor(sortedValues.length / 2);
     
        if (sortedValues.length % 2 === 0) {
          return (sortedValues[midIndex - 1] + sortedValues[midIndex]) / 2;
        } else {
          return sortedValues[midIndex];
        }
    }
    
    // Task 8: Calculate quarter 1 in the specified column
    calculateQ1(columnValues) {
        const sortedValues = columnValues.filter(value => value !== null).sort((a, b) => a - b);
        const midIndex = Math.floor(sortedValues.length / 2);
     
        return this.calculateMedian(sortedValues.slice(0, midIndex));
    }
    
    // Task 9: Calculate quarter 2 in the specified column
    calculateQ2(columnValues) {
        const sortedValues = columnValues.filter(value => value !== null).sort((a, b) => a - b);
        return this.calculateMedian(sortedValues);
    }
    
    // Overall functions
    calculateColumnStats(data, columnName) {
        const columnValues = this.getColumnValues(data, columnName);
     
        return {
          column: columnName,
          sum: this.calculateSum(columnValues),
          avg: this.calculateAverage(columnValues),
          min: this.calculateMin(columnValues),
          max: this.calculateMax(columnValues),
          std: this.calculateStandardDeviation(columnValues),
          countOfNull: this.calculateCountNullValues(columnValues),
          percentageOfNulls: this.calculateNullPercentage(columnValues),
          q1 : this.calculateQ1(columnValues),
          q2 : this.calculateQ2(columnValues)
        };
      }
    
}

export { Functions };