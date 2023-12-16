class Sales {

    header = [];
    value = [];

    constructor(data) {
        this.header = data[0];
        this.value = data.slice(1);
    }

    sum(array) {

        if (array == null) {
            let salesCount = 0;
            let quantityCount = 0;
            let discountCount = 0;

            let salesIndex = this.header.indexOf("Sales");
            let quantityIndex = this.header.indexOf("Quantity");
            let discountIndex = this.header.indexOf("Discount Percentage");

            this.value.forEach((row) => {
                salesCount += row[salesIndex];
                quantityCount += row[quantityIndex];
                discountCount += row[discountIndex];
            });

            console.log(salesCount);
            console.log(quantityCount);
            console.log(discountCount);


        }

        else {
            array.forEach((element) => {
                let sum = 0;
                let index = this.header.indexOf(element);

                this.value.forEach((row) => {
                    sum += row[index];

                })

                console.log(sum);
            })
        }
    }


    minValue(array) {

        if (array == null) {
            let salesIndex = this.header.indexOf("Sales");
            let quantityIndex = this.header.indexOf("Quantity");
            let discountIndex = this.header.indexOf("Discount Percentage");

            let salesMin = this.value[0][salesIndex];
            let quantityMin = this.value[0][quantityIndex];
            let discountMin = this.value[0][discountIndex];

            this.value.forEach((row) => {

                salesMin = Math.min(row[salesIndex], salesMin);
                quantityMin = Math.min(row[quantityIndex], quantityMin);
                discountMin = Math.min(row[discountIndex], discountMin);

            });

            console.log(salesMin);
            console.log(quantityMin);
            console.log(discountMin);

        }
        else {

            array.forEach((element) => {

                let index = this.header.indexOf(element);

                let minimum = this.value[0][index];

                this.value.forEach((row) => {
                    minimum = Math.min(minimum, row[index]);
                })

                console.log(minimum);
            })

        }
    }

    maxValue(array) {

        if (array == null) {

            let salesIndex = this.header.indexOf("Sales");
            let quantityIndex = this.header.indexOf("Quantity");
            let discountIndex = this.header.indexOf("Discount Percentage");

            let salesMax = this.value[0][salesIndex];
            let quantityMax = this.value[0][quantityIndex];
            let discountMax = this.value[0][discountIndex];

            this.value.forEach((row) => {

                salesMax = Math.min(row[salesIndex], salesMax);
                quantityMax = Math.min(row[quantityIndex], quantityMax);
                discountMax = Math.min(row[discountIndex], discountMax);

            });

            console.log(salesMax);
            console.log(quantityMax);
            console.log(discountMax);

        }
        else {
            array.forEach((element) => {

                let index = this.header.indexOf(element);

                let maximum = this.value[0][index];

                this.value.forEach((row) => {
                    maximum = Math.min(maximum, row[index]);
                })

                console.log(maximum);
            })
        }

    }

}

export {
    Sales
}
