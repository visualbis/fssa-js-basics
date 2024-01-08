class DataParser {
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

  filterColumn(sourceColumn, value) {
    const index = this.header.indexOf(sourceColumn);
    if (index === -1) {
        throw new Error(`Column ${sourceColumn} not found`);
    }   
    let resultValues = [];
    this.values.forEach((row) => {
        if (value == row[index]) {
            resultValues.push(row);
        }
    });
    let resultHeader = this.header;
    return [resultHeader, resultValues];
}

  filterArrayObjectColumn(filterList) {
    if (filterList.length === 0) {
        console.log("Filter list is empty");
        return;
    }
    let filteredValues = this.values.slice();
    filterList.forEach((filter) => {
        const index = this.header.indexOf(filter.column);
        if (index === -1) {
            throw new Error(`Column ${filter.column} not found`);
        }
        filteredValues = filteredValues.slice().filter((row) => row[index] === filter.value);
    });
    const resultHeader = this.header;
    return [resultHeader, filteredValues];
  }

  logData() {
    console.log(this.header);
    console.log(this.values);
  }
}

export { DataParser };
