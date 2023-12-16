let input = ["12-3", "m/y"]
let date = input[0].split(/\W/); // 22 03 1998
let format = input[1].split(/\W/); // dd mm yyyy
let outputFormat = ['yyyy', 'mm', 'dd']; // 
let outputFormatOptional = ['yy', 'm', 'd'];
let output = [];
let count;
let n = date.length;
for(let i=0; i<n; i++){
  count = 0;
    for(let j=0; j<n; j++){
        if(format[j][0] === outputFormat[i][0] || format[j][0] === outputFormatOptional[i][0]){
          if(date[j].length != 2) output.push("0"+date[j]);
          else output.push(date[j]);
          
          break;
        } else {
          count++;
        }
    }
    if(count === 3){
      output.push("00");
    }
}
if(output[0].length == 2) output[0] = "00" + output[0];

console.log(output);
