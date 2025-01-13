class DataParse{
    header = [];
    values = [] ; 
    constructor(data){
        this.header = data[0];
        this.values = data.slice(1);
    }
    columnRoundOff(column,number){
        let index  =  this.header.indexOf(column);
        if(index!=-1){
            let n = numberOfDecimal(number);
            for(let i = 1 ; i < this.values.length ; i++){
                this.values[i][index] = Math.round(this.values[i][index]*n)/n;
            }
        }      
    }
    addColumn(column,percentage){
        let index  =  this.header.indexOf(column);
        if(index!=-1){
            this.header.push(column + " + " + percentage + "%");
            for(let i = 1 ; i < this.values.length ; i++){
                let value =  this.values[i][index];
                this.values[i].push((percentage/100)*value);
            }
        }

    }

    print(){
        this.values.forEach(element => {
            console.log(element)
            
        });
    }
    deepfilter(arr){
        let index = []
        for(let i = 0; i < arr.length ; i++){
           index.push(this.header.indexOf(arr[i]["column"]))
        }
        let newArr = [];
        for(let i = 0; i < this.values.length ; i++){
            let chk = false;
            for(let j  = 0 ; j < index ; j++){
                
            }
         }


    }
    
 filterArrayObjectColumn(filterList) {
    if (filterList.length === 0) {
      console.log("Filter list is empty");
      return [this.header, this.values];
    }
   
    filterList.forEach((filter) => {
      const index = this.header.indexOf(filter.column);
      if (index === -1) {
        throw new Error(`Column ${filter.column} not found`);
      }
      this.values = this.values.filter((row) => row[index] === filter.value);
    });
   
    return [this.header, this.originalData];
  }
}


function numberOfDecimal(num) {
    let n  = 10 ; 
    for(let i  =  1 ; i< num ; i++){
        n*=10;
    }
    if(num!=0)
    return n;
else 
    return 1 ;
}


export default DataParse;
