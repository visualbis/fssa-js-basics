class DataParse{
    header = [];
    values = [] ; 
    constructor(data){
        this.header = data[0];
        this.values = data.slice(1);
    }
    columnRoundOff(col,num){
        let index  =  this.header.indexOf(col);
        if(index!=-1){
            let n = numberOfDecimal(num);
            for(let i = 1 ; i < this.values.length ; i++){
                this.values[i][index] = Math.round(this.values[i][index]*n)/n;
            }
        }      
    }
    addColumn(col,per){
        let index  =  this.header.indexOf(col);
        if(index!=-1){
            this.values[0].push(col + " + " + per + "%");
            for(let i = 1 ; i < this.values.length ; i++){
                let value =  this.values[i][index];
                this.values[i].push((per/100)*value);
            }
        }

    }
    print(){
        this.values.forEach(element => {
            console.log(element)
            
        });
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
