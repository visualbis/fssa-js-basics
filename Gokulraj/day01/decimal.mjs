class Decimal {

    header = [];
    value = [];
    data =[];

    constructor(data) {
        this.header = data[0];
        this.value = data.slice(1);
        this.data = data.slice(1);
    }

    filterColumn(columnname, value) {
        const index = this.header.indexOf(columname);
        if (index === -1) {
            throw new Error(`Column ${columnname} not found`);
        }

        this.value.forEach((row) => {
            if (value == row[index]) {
                console.log(row);
            }
        });
    }

    filter(filterList) {

        if (filterList.length === 0) {
          console.log("Filter list is empty");
          return [this.header, this.data];
        }
       
        filterList.forEach((filter) => {
          const index = this.header.indexOf(filter.column);
          if (index === -1) {
            throw new Error(`Column ${filter.column} not found`);
          }
          this.Data = this.Data.filter((row) => row[index] === filter.value);
        });
       
       console.log(this.data,this.header)
      }


    roundoffDecimal(columnname, decimal) {

        let index = this.header.indexOf(columnname);

        if (index === -1) {
            throw new Error(`Column ${columnname} not found`);
        }


        for (let i = 0; i < this.value.length; i++) {
            let num = parseFloat(this.value[i][index]);
            let n = num.toFixed(decimal);

            this.value[i].push(n);
        }

    }


    columnpercentage(columnname, percentage) {

        let index = this.header.indexOf(columnname);

        if (index === -1) {
            throw new Error(`Column ${columnname} not found`);
        }

        this.header.push(columnname + " + " + percentage);

        for (let i = 0; i < this.value.length; i++) {

            this.value[i].push(parseFloat(this.value[i][index]) + parseFloat((percentage / 100) * this.value[i][index]));

        }
    }

    logData() {
        console.log(this.header);
        console.log(this.value);
    }


}

export {
    Decimal
}