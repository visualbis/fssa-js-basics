class DataParser {
  header = [];
  values = [];
  originalData = [];
 
  constructor(data) {
    this.header = data[0];
    this.values = data.slice(1);
    this.originalData = data.slice(1);
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
    this.originalData.forEach((row) => {
        if (value == row[index]) {
            resultValues.push(row);
        }
    });
    let resultHeader = this.header;
    this.values = this.originalData;
    return [resultHeader, resultValues];
}
 
filterArrayObjectColumn(filterList) {
  if (filterList.length === 0) {
    console.log("Filter list is empty");
    return [this.header, this.originalData];
  }

  filterList.forEach((filter) => {
    const index = this.header.indexOf(filter.column);
    if (index === -1) {
      throw new Error(`Column ${filter.column} not found`);
    }
    this.originalData = this.originalData.filter((row) => row[index] === filter.value);
  });

  return [this.header, this.originalData];
} 

 
  logData() {
    console.log(this.header);
    console.log(this.values);
  }
}
 
export { DataParser };