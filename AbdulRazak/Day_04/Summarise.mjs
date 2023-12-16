class SummarizeData {
    summarize(arrayOfData, column) {
        const arrList = [];
        for (const columnName of column) {
            const index = arrayOfData[0].indexOf(columnName);
            if (index === -1) throw new Error("Invalid Column Name");
            const arr = [];
            arr.push(columnName);
            arr.push(this.sum(arrayOfData, index));
            arr.push(this.avg(arrayOfData, index));
            arr.push(this.min(arrayOfData, index));
            arr.push(this.max(arrayOfData, index));
            const count = this.nullCount(arrayOfData, index);
            arr.push(count);
            arr.push(this.nullPer(arrayOfData, count));
            arrList.push(arr);
        }
        return arrList;
    }
    sum(arr, index) {
        let sum = 0;
        for (let i = 1; i < arr.length; i++) {
            if(arr[i][index] !=null){
            let num = parseFloat(arr[i][index]);
         
                sum += num
            
        }
        }
        return sum;
    }
    avg(arr, index) {
        let sum = 0;
        let count = 0;
        for (let i = 1; i < arr.length; i++) {
            if(arr[i][index] !=null){
                let num = parseFloat(arr[i][index]);
              
                    sum += num
                    count++;
                
            }
            
        }
        return sum / count;
    }
    min(arr, index) {
        let min = arr[1][index];
        for (let i = 1; i < arr.length; i++) {
            let val = parseFloat(arr[i][index]);
            if (val < min) {
                min = val;
            }
        }
        return min;
    }   
    max(arr, index) {
        let max = 0;
        for (let i = 1; i < arr.length; i++) {
            const val = parseFloat(arr[i][index]);
            if (val > max) {
                max = val;
            }
        }
        return max;
    }

    nullCount(arr, index) {
        let count = 0;
        for (let i = 1; i < arr.length; i++) {
            if (arr[i][index] == null) count++;
        }
        return count;
    }

    nullPer(arr, count) {
        const total = arr.length - 1;
        return (count / total) * 100;
    }
}





export default SummarizeData;