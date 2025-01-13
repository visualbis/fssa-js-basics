let date = "26/09/2022"; // or 26-2022
let dateFormate = "dd/MM/yyyy";
let array = [];

let delimiter = date.includes("/") ? "/" : "-";
let dateArray = date.split(delimiter);

let day = dateArray[0];
let month = dateArray[1];
let year = dateArray[2];

day = day.length === 1 ? "0" + day : day;
month = month.length === 1 ? "0" + month : month;

if (dateFormate === "dd/MM/yyyy") {
    array = [year, month, day];
} else if (dateFormate === "MM/dd/yyyy") {
    array = [year, month, day];
} else {
    console.error("Unsupported date format");
}

array = array.map(value => (value === undefined ? "0" : value));

console.log(array);
