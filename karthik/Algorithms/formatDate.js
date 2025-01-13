let arr = ["2-3-1998", "dd/mm/yyyy"];

let date = arr[0].split('-');

let formattedDay = date[0].length === 1 ? '0' + date[0] : date[0];
let formattedMonth = date[1].length === 1 ? '0' + date[1] : date[1];

let resultArray = [
    date[2] || '0',
    formattedMonth || '0',
  formattedDay || '0'
];

console.log(resultArray);
