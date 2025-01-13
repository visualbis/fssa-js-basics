class Data {

    header = [];
    value = [];

    constructor(data) {
        this.header = data[0];
        this.value = data.slice(1);
    }

    groupRules(object) {
       
        this.header.push("Group")

        this.value.forEach((row) => {
            
            object.forEach((groupRow) => {

                if (row[1] >= groupRow.from && row[1] <= groupRow.to) {

                    row.push(groupRow.columnName);
                
                }

            })
        })
    }

    assignRank(ranking) {

        for (let i = 0; i < this.value.length; i++) {
            for (let j = i + 1; j < this.value.length; j++) {
                if (this.value[j][1] > this.value[i][1]) {
                    const temp = this.value[i];
                    this.value[i] = this.value[j];
                    this.value[j] = temp;
                }
            }
        }

        this.header.push("Rank");

        let count = 0;
        let rank = 1;
        for (let i = 0; i < this.value.length; i++) {

            this.value[i].push(rank);
            count++;
            if (i < this.value.length - 1 && this.value[i][1] != this.value[i + 1][1]) {
                rank += count;
                count = 0;
            }

        }

        
        let index = this.header.indexOf("Rank");

        this.value.forEach((row) =>{

            if(row[index] <= ranking){
                console.log(row);
                
            }

        })
    }


    runningTotal(){
    
        let total = [];

        let product = [...new Set(this.value.map(row => row[0]))]
        
        product.forEach((element) => {
            let count = 0;

            let oneProduct = this.value.filter(ele => ele[0] == element);

            oneProduct.forEach((row) => {

                count += parseInt(row[2]);

                row.push(count);
            })
            

            total.push(oneProduct);

        })

        console.log(total);        
    }

  

    logData() {
        console.log(this.header, this.value);
    }

}

export {
    Data
}