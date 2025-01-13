class DataParser {
  head = [];
  value = [];
  constructor(data) {
    this.head = data[0];
    this.value = data.slice(1);
  }

  // round the column values function
  roundOfColumnValue(columnName, decimal) {
    let columnIndex = this.head.indexOf(columnName);

    if (columnIndex == -1) {
      throw new Error(
        `Column name ${columnName} is not exists in the data collections`
      );
    }

    this.value = this.value.map((row) => {
      row[columnIndex] = parseFloat(row[columnIndex]).toFixed(decimal);
      return row;
    });
  }

  // filter the column data
  filterTheColumnData(columnName, columnValues) {
    const columnIndex = this.head.indexOf(columnName);
    if (columnIndex == -1) {
      throw new Error(
        `Column name ${columnName} is not exists in the data collections`
      );
    }
    this.value.filter((row) => {
      return columnValues === row[columnIndex];
    });
  }

  // Filter the matched Values
  filterTheMultipleColumnValues(filterList) {
    return this.value.filter((row) => {
      return filterList.every((filter) => {
        const columnIndex = this.head.indexOf(filter.column);
        return row[columnIndex] === filter.value;
      });
    });
  }

  // Show data of current collection function
  logData() {
    console.log(this.head);
    console.log(this.value);
  }
}
export { DataParser };
