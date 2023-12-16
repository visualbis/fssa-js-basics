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
            arr.push(this.nullPer(arrayOfData, index, count));
            arrList.push(arr);
        }
        return arrList;
    }

    sum(arr, index) {
        let sum = 0;
        for (let i = 1; i < arr.length; i++) {
            sum += parseFloat(arr[i][index]);
        }
        return sum;
    }

    avg(arr, index) {
        let sum = 0;
        let count = 0;
        for (let i = 1; i < arr.length; i++) {
            sum += parseFloat(arr[i][index]);
            count++;
        }
        return sum / count;
    }

    min(arr, index) {
        let min = 0;
        for (let i = 1; i < arr.length; i++) {
            const val = parseFloat(arr[i][index]);
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
            if (arr[i][index].trim() === '') count++;
        }
        return count;
    }

    nullPer(arr, count) {
        const total = arr.length - 1;
        return (count / total) * 100;
    }
}

// Example usage
const summarizeData = new SummarizeData();
const arrayOfData = [
    ['ColumnName1', 'ColumnName2', 'ColumnName3'],
    ['Value1', 'Value2', 'Value3'],
    // ... more data rows
];

const column = ['ColumnName1', 'ColumnName2'];
const result = summarizeData.summarize(arrayOfData, column);
console.log(result);




