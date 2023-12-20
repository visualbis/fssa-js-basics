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
                if (row[salesIndex] != null) {
                    salesCount += row[salesIndex];
                }
                if (row[quantityIndex] != null) {
                    quantityCount += row[quantityIndex];
                }
                if (row[discountIndex] != null) {
                    discountCount += row[discountIndex];
                }
            });

            console.log("Sum of Sales",salesCount);
            console.log("Sum of quantity",quantityCount);
            console.log("Sum of discount",discountCount);


        }

        else {
            array.forEach((element) => {
                let sum = 0;
                let index = this.header.indexOf(element);

                this.value.forEach((row) => {
                    if (row[index] != null) {
                        sum += row[index];
                    }
                  
                })
                console.log("Sum of " + element ,sum);
              
            })
        }
    }

    avg(array) {
        if (array == null) {
            let salesCount = 0;
            let quantityCount = 0;
            let discountCount = 0;

            let salesIndex = this.header.indexOf("Sales");
            let quantityIndex = this.header.indexOf("Quantity");
            let discountIndex = this.header.indexOf("Discount Percentage");

            this.value.forEach((row) => {
                if (row[salesIndex] !== null) {
                    salesCount += row[salesIndex];
                }
                if (row[quantityIndex] !== null) {
                    quantityCount += row[quantityIndex];
                }
                if (row[discountIndex] !== null) {
                    discountCount += row[discountIndex];
                }
            });

            const rowCount = this.value.length;

            console.log("Averge of Sales",salesCount / rowCount);
            console.log("Averge of quantity",quantityCount / rowCount);
            console.log("Averge of discount",discountCount / rowCount);
        } else {
            array.forEach((element) => {
                let sum = 0;
                let index = this.header.indexOf(element);

                this.value.forEach((row) => {
                    if (row[index] != null) {
                        sum += row[index];
                    }
                });

                const rowCount = this.value.length;

                console.log("Averge of "+element,sum / rowCount);
            });
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

                if (row[salesIndex] != null) {
                    salesMin = Math.min(row[salesIndex], salesMin);
                }
                if (row[quantityIndex] != null) {
                    quantityMin = Math.min(row[quantityIndex], quantityMin);
                }
                if (row[discountIndex] != null) {
                    discountMin = Math.min(row[discountIndex], discountMin);
                }

            });

            console.log("Minimun Vaule of Sales",salesMin);
            console.log("Minimun Vaule of quantity",quantityMin);
            console.log("Minimun Vaule of discount",discountMin);

        }
        else {

            array.forEach((element) => {

                let index = this.header.indexOf(element);

                let minimum = this.value[0][index];

                this.value.forEach((row) => {
                    if (row[index] != null) {
                        minimum = Math.min(minimum, row[index]);
                    }
                })

                console.log("Minimun Vaule of "+element,minimum);
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

                if (row[salesIndex] != null) {
                    salesMax = Math.min(row[salesIndex], salesMax);
                }
                if (row[quantityIndex] != null) {
                    quantityMax = Math.min(row[quantityIndex], quantityMax);
                }
                if (row[discountIndex] != null) {
                    discountMax = Math.min(row[discountIndex], discountMax);
                }

            });

            console.log("Maximum Vaule of Sales",salesMax);
            console.log("Maximum Vaule of quantity",quantityMax);
            console.log("Maximum Vaule of discount",discountMax);

        }
        else {
            array.forEach((element) => {

                let index = this.header.indexOf(element);

                let maximum = this.value[0][index];

                this.value.forEach((row) => {
                    if (row[index] != null) {
                        maximum = Math.min(maximum, row[index]);
                    }
                })

                console.log("Maximum Vaule of "+element,maximum);
            })
        }

    }

    nullCount(array) {
        if (array == null) {
            let salesCount = 0;
            let quantityCount = 0;
            let discountCount = 0;

            let salesIndex = this.header.indexOf("Sales");
            let quantityIndex = this.header.indexOf("Quantity");
            let discountIndex = this.header.indexOf("Discount Percentage");

            this.value.forEach((row) => {
                if (row[salesIndex] == null) {
                    salesCount++;
                }
                if (row[quantityIndex] == null) {
                    quantityCount++;
                }
                if (row[discountIndex] == null) {
                    discountCount++;
                }
            });

            console.log("Null Count of Sales",salesCount);
            console.log("Null Count of quantity",quantityCount);
            console.log("Null Count of discount",discountCount);


        }

        else {
            array.forEach((element) => {
                let count = 0;
                let index = this.header.indexOf(element);

                this.value.forEach((row) => {
                    if (row[index] == null) {
                        count++;
                    }

                })
                console.log(count);
            })
        }

    }

    nullpercentage(array) {

        if (array == null) {
            let salesCount = 0;
            let quantityCount = 0;
            let discountCount = 0;

            let salesIndex = this.header.indexOf("Sales");
            let quantityIndex = this.header.indexOf("Quantity");
            let discountIndex = this.header.indexOf("Discount Percentage");

            this.value.forEach((row) => {
                if (row[salesIndex] == null) {
                    salesCount++;
                }
                if (row[quantityIndex] == null) {
                    quantityCount++;
                }
                if (row[discountIndex] == null) {
                    discountCount++;
                }
            });
            
            salesCount = salesCount / this.value.length;
            quantityCount = quantityCount/this.value.length;
            discountCount = discountCount / this.value.length;

            console.log(salesCount);
            console.log(quantityCount);
            console.log(discountCount);


        }

        else {
            array.forEach((element) => {
                let count = 0;
                let index = this.header.indexOf(element);

                this.value.forEach((row) => {
                    if (row[index] == null) {
                        count++;
                    }

                })

                count = count / this.value.length;
                
                console.log(count);
            })
        }

    }

    

}

export {
    Sales
}
