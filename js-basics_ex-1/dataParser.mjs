class DataParser {
  header = [];
  values = [];
 
  constructor(data) {
    this.header = data[0];
    this.values = data.slice(1);
  }
 
  roundColumnValues(columnName, decimalPlaces) {
    const columnIndex = this.header.indexOf(columnName);
    if (columnIndex === -1) {
      throw new Error(`Column ${columnName} not found`);
    }

    this.values.forEach((row) => {
      const originalValue = parseFloat(row[columnIndex]);
      const roundedValue = Number(originalValue.toFixed(decimalPlaces));
      row[columnIndex] = roundedValue;
    });
  }
 
  filterRowsByColumn(columnName, valueToMatch) {
    const columnIndex = this.header.indexOf(columnName);
    if (columnIndex === -1) {
      throw new Error(`Column ${columnName} not found`);
    }

    console.log(this.header);
    
    this.values.forEach((row) => {
      if (valueToMatch === row[columnIndex]) {
        console.log(row);
      }
    });
  }

filterArrayObjectColumn(filterList) {
  filterList.forEach((filter) => {
    const { column, value } = filter;
    const index = this.header.indexOf(column);
    if (index === -1) {
      throw new Error(`Column ${column} not found`);
    }
    this.values = this.values.filter((row) => row[index] === filter.value);
  });
  return this.values;
}

  logData() {
    console.log(this.header);
    console.log(this.values);
  }
}

export { DataParser };
