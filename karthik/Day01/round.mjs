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
      console.log(this.header);
      this.values.forEach((row) => {
          if (value == row[index]) {
              console.log(row);
          }
      });
  }
 
 
    logData() {
      console.log(this.header);
      console.log(this.values);
    }
  }
 
  export { DataParser };
 
