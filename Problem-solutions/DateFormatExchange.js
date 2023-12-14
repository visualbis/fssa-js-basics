let input = ["2", "mm"]
let date = input[0].split('/'); // 22 03 1998
let format = input[1].split('/'); // dd mm yyyy
let outputFormat = ['yyyy', 'mm', 'dd']; // 
let output = [];
let count;
for(let i=0; i<3; i++){
  count = 0;
    for(let j=0; j<3; j++){
        if(format[j] === outputFormat[i]){
          output.push(date[j]);
          break;
        } else {
          count++;
        }
    }
    if(count === 3){
      output.push("00");
    }
}
console.log(output);