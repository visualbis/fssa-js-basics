class Datarounder{

    header = [];
    values = [];

     Datarounder(data){
        this.header = header;
        this.values = values;
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

    

}

export { Datarounder };