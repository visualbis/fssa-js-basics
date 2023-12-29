let array = ["9,5", "2,1", "3,2", "3,1", "2,2", "9,4", "1,4", "1,2", "6,1",
             "7,3", "1,1", "6,3", "6,2", "1,5", "8,5", "8,4", "7,1", "7,2"]

function box(array){
let max = Math.max(parseInt(array));

let ans = [];
for(let i = 0 ;i < max; i++){
    let newArray = [];
    for(let j = 0 ; j < max ; j++){
        newArray[j] = 0;
    }  
    ans.push(newArray);
}

for(let i = 0; i < array.length;i++){

    let values = array[i].split(","); 

    ans[parseInt(values[0] - 1)][parseInt(values[1] - 1 )] = 1;

}

console.log(ans);

let count = 0;

}

function countbox(array,row,column,count){

    if(row < 0 || column < 0 || row > array.length - 1  || column > array.length -1 || array[i][j] == 0)
        return 


    array[row][column] = 0;
    countbox(array,row+1,column);
    countbox(array,row,column+1);
    countbox(array,row-1,column);
    countbox(array,row,column-1);

    array[row][column] = 1;


}