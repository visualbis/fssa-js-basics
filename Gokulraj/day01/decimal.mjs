class Decimal {

    header = [];
    value = [];

    constructor(data) {
        this.header = data[0];
        this.value = data.slice(1);

    }

    filterColumn(columnname, value) {
        const index = this.header.indexOf(columnname);
        if (index === -1) {
            throw new Error(`Column ${columnname} not found`);
        }

        this.value.forEach((row) => {
            if (value == row[index]) {
                console.log(row);
            }
        });
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