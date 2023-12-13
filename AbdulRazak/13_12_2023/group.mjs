 // 1 - group according to value 
 // top 5 rank according to sales 
 class DataSet {
    header = [];
    values = [];
    constructor(list){
    this.header = list[0];
    this.values = list.slice(1);    
    }
    groupBy(min1 , min2 , min3 , col ){
        let index = this.header.indexOf(col);
        if(index==-1){
            throw new Error("cant find the column name")
        }
        let arr =  this.values;
        this.header.push("Group");
        for(let i = 0  ; i < arr.length ; i++){
            let sale =  parseFloat(arr[i][index]);
            if(sale >= min1 && sale<min2){
                arr[i].push("poor");
            }else if(sale >= min2 && sale<min3){
                arr[i].push("neutral");
            }else arr[i].push("good");
        }
        this.values = arr;
        console.log(arr)
    }
    filterByGroup(col ,grp){
        let arr =   this.values;
        let index = this.header.indexOf(col);
        if(index==-1){
            throw new Error("cant find the column name")
        }
        let newArr = arr.filter(ar => ar[index]==grp);
        newArr.unshift(this.header);
        return newArr;
    }
    rankBy(col,n){
        let index = this.header.indexOf(col);
        this.header.push("Rank")
        if(index==-1){
            throw new Error("cant find the column name")
        }
         let arr =  this.values;
         arr.sort((a,b)=>b[index]-a[index])
         arr[0].push(1);
         let rank = 1 ;
         for(let i = 1 ; i < arr.length ; i++){
            if(arr[i-1][index] == arr[i][index]){
                arr[i].push(rank);
            }else{
                rank = i+1;
                arr[i].push(rank);
            }

         }
         this.values =  arr
         let newArr = []
         for(let i  = 0 ; i < n ; i++){
            newArr.push(arr[i]);
         }
         newArr.unshift(this.header)
         return newArr;
    }
    runningTotal(col,prd,colOfrun){
        let index = this.header.indexOf(col);
        let index2 = this.header.indexOf(colOfrun);
        if(index==-1 || index2 == -1){
            throw new Error("cant find the column name")
        }
        this.header.push("Running Total");
        let arr = this.values.filter((a)=>a[index] == prd);
        let sum = 0 ;
        for(let i = 0 ; i < arr.length ; i++){
            sum += parseFloat( arr[i][index2]);
            arr[i].push(sum)
        }

        this.values = arr;
        console.log(arr);
    }


 }
 export default DataSet;