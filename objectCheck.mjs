class dataParser {
  head = [];

  constructor(data) {
    this.head = data;
  }

  // round the column values function
  roundOfColumnValue(columnName, decimal) {
    let columnIndex = this.head[0].indexOf(columnName);

    if (columnIndex == -1) {
      throw new Error(
        `Column name ${columnName} is not exists in the data collections`
      );
    }
    this.head = this.head.map((row, index) => {
      if (index === 0) {
        return row;
      } else {
        row[columnIndex] = parseFloat(row[columnIndex]).toFixed(decimal);
        return row;
      }
    });
  }

  // filter the column data
  filterTheColumnData(columnName, columnValues) {
    const columnIndex = this.head[0].indexOf(columnName);
    if (columnIndex == -1) {
      throw new Error(
        `Column name ${columnName} is not exists in the data collections`
      );
    }
    this.head = this.head.filter((row, index) => {
      if (index === 0) {
        return;
      }
      return columnValues === row[columnIndex];
    });
  }

  // Show data of current collection function
  logData() {
    return this.head;
  }
}
export { dataParser };
