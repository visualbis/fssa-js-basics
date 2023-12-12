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
    
    filterColumn (Column, value){
      const index = this.header.indexOf(Column);
        if (index === -1) {
          throw new Error(`Column ${Column} not found`);
        }
        this.values.forEach((row) => {
          const val = row[index];
          if(value == val){
            console.log(row);
          }
        });
    }
}

export { Datarounder };