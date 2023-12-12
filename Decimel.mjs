class Decimal {
  header = [];
  values = [];

  constructor(data) {
    this.header = data[0];
    this.values = data.slice(1);
  }

  roundOffColumn(sourceColumn, decimal) {
    const index = this.header.indexOf(sourceColumn);
    if (index === -1) {
      throw new Error(`Column ${sourceColumn} not found`);
    }
    this.values.forEach((row) => {
      const value = row[index];
      let newValue = parseFloat(value).toFixed(decimal);
      row[index] = newValue;
    });
  }

  //Filter column
  filterColumn(sourceColumn, value) {
    const index = this.header.indexOf(sourceColumn);
    if (index === -1) {
      throw new Error(`Column ${sourceColumn} not found`);
    }
    console.log(this.header);
    this.values.forEach((row) => {
      if (value == row[index]) {
        console.log(row);
      }
    });
  }

  //Filter row
  filterRow(filterList) {
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
 
export { Decimal };