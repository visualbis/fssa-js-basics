class Datarounder{

    header = [];
    values = [];

     constructor(data){
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

    filterColumn(obj) {
      let columnIndex = this.header.indexOf(obj.column);
    
      if (columnIndex === -1) {
        throw new Error(`Column not found`);
      }
    
      this.values.forEach((row) => {
        if (row[columnIndex] === obj.value) {
          console.log(row);
        }
      });
    }

    filterColumns(objArray) {
      let conditions = objArray.map(obj => {
        let columnIndex = this.header.indexOf(obj.column);
    
        if (columnIndex === -1) {
          throw new Error(`Column not found: ${obj.column}`);
        }
    
        return row => row[columnIndex] === obj.value;
      });
    
      let filteredData = this.values.filter(row => conditions.every(condition => condition(row)));
    
      filteredData.forEach(row => {
        console.log(row);
      });
    }
    
    
    




}

export { Datarounder };