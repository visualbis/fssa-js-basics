let dateFormatData = {
  year: ["yyyy", "yy", "YYYY", "YY"],
  week: ["w", "W"],
  month: ["MM", "mm", "M", "m"],
  date: ["dd", "DD", "d", "D"],
};

function solve(date, dateFormatStructure) {
  let parsedFormat = [];

  // Split the values
  let dateSplit = date[0].split(/[\/-]/);
  let dateFormatSplit = date[1].split(/[\/-]/);

  for (let i = 0; i < dateFormatSplit.length; i++) {
    let type = checkTheDateFormatType(dateFormatSplit[i]);
    if (type == null) {
      throw new Error(`${dateFormatSplit[i]} is a invalid date format type`);
    }

    let typeIndex = dateFormatStructure.indexOf(type);

    if (type == "date" || type == "month") {
      parsedFormat[typeIndex] = dateSplit[i].padStart(2, "0");
    } else if (type === "year") {
      parsedFormat[typeIndex] = dateSplit[i].padStart(4, "0");
    }
  }

  // Check for missing parts and add "00"
  for (let i = 0; i < dateFormatStructure.length; i++) {
    if (!parsedFormat[i]) {
      parsedFormat[i] = "00";
    }
  }

  return parsedFormat;
}

// Example usage 1:
let dateFormatStructure1 = ["year", "month", "date"];
let data1 = ["22/03/1998", "dd/mm/yyyy"];
// Output = ["1998", "03", "22"]
let formattedData1 = solve(data1, dateFormatStructure1);
console.log(formattedData1);

// Example usage 2:
let dateFormatStructure2 = ["year", "month", "date"];
let data2 = ["22-1998", "dd-yyyy"];
// Output = ["1998", "03", "22"]
let formattedData2 = solve(data2, dateFormatStructure2);
console.log(formattedData2);

// Example usage 3:
let dateFormatStructure3 = ["year", "month", "date"];
let data3 = ["22/03/2010", "dd/m/yy"];
// Output = ["10", "3", "22"]
let formattedData3 = solve(data3, dateFormatStructure3);
console.log(formattedData3);

// Check the which format is matching to the date, month and year
function checkTheDateFormatType(format) {
  for (const category in dateFormatData) {
    if (dateFormatData[category].includes(format)) {
      return category;
    }
  }
  return null;
}
