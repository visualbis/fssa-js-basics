class DataParser {
    header = [];
    values = [];

    constructor(data) {
        this.header = data[0];
        this.values = data.slice(1);
    }

    decimalController(coloumn, count) {
        const index = this.header.indexOf(coloumn);
        if(index === -1) {
            throw new Error(`Coloumn ${coloumn} not found`);
        }
        this.values.forEach((row) => {
            const value = row[index];
            let newValue = parseFloat(value).toFixed(count);
            row[index] = newValue;
            console.log(row);
        })
        console.log();

    }

    dataFilter(coloumn, value) {
        const index = this.header.indexOf(coloumn);
        if(index === -1) {
            throw new Error(`Coloumn ${coloumn} not found`);
        }
        console.log(this.header);
        this.values.forEach((row) => {
            if(value == row[index]){
                console.log(row);
            }
        })
    }

logData() {
    console.log(this.header);
    console.log(this.values);
}
}

export { DataParser }