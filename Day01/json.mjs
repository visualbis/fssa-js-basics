const data = [
  ["Category", "SubCategory", "Profit", "Sales"],
  ["Technology", "Copiers", "55617.824900000036", "149528.02999999994"],
  ["Technology", "Phones", "44515.73059999999", "330007.0539999998"],
  ["Technology", "Accessories", "41936.635699999955", "167380.318"],
  ["Technology", "Machines", "3384.756899999995", "189238.631"],
  ["Office Supplies", "Paper", "34053.56929999999", "78479.20599999995"],
  ["Office Supplies", "Binders", "30221.76329999999", "203412.73300000004"],
  ["Office Supplies", "Storage", "21278.82639999999", "223843.60799999998"],
  ["Office Supplies", "Appliances", "18138.00540000003", "107532.1610000001"],
  ["Office Supplies", "Envelopes", "6964.176699999995", "16476.402"],
  ["Office Supplies", "Art", "6527.786999999998", "27118.791999999998"],
  ["Office Supplies", "Labels", "5546.253999999996", "12486.312000000005"],
  ["Office Supplies", "Fasteners", "949.5181999999995", "3024.2799999999997"],
  ["Office Supplies", "Supplies", "-1189.0994999999998", "46673.53799999997"],
  ["Furniture", "Chairs", "26590.16630000003", "328449.10300000064"],
  ["Furniture", "Furnishings", "13059.143600000005", "91705.16399999989"],
  ["Furniture", "Bookcases", "-3472.5560000000046", "114879.9963"],
  ["Furniture", "Tables", "-17725.481100000015", "206965.53199999995"],
];

// Rounded values

let convertedData = data.map((row, index) => {
  if (index === 0) return row;
  let roundedRow = row.map((value, valueIndex) => {
    if (valueIndex <= 1 || isNaN(parseFloat(value))) {
      return value;
    }
    return parseFloat(value).toFixed(2);
  });

  return roundedRow;
});

//console.log(convertedData);

// Sale + 10%

let salePlus10Percentage = convertedData.map((row, index) => {
  if (index === 0) {
    row.push("Sales Plus 10%");
  } else {
    let percentage = parseFloat((10 * row[row.length - 1]) / 100);
    row.push(percentage.toFixed(2));
  }
  return row;
});

//console.log(salePlus10Percentage);

// If technology add 5% profit

let technologyAddPercentage = salePlus10Percentage.map((row, index) => {
  if (index == 0) {
    row.push("Technology 5 % added");
  } else {
    if (row[0] == "Technology") {
      let val = parseFloat(row[2]);
      let percentage = (5 * val) / 100 + val;
      row.push(parseFloat(percentage).toFixed(2));
    } else {
      row.push(row[2]);
    }
  }
  return row;
});

//console.log(technologyAddPercentage);

// Create elements

// Add column
function addColumn(data, columnName, valueColumn, percentage) {
  let columnIndex = data[0].indexOf(valueColumn);
  // console.log(columnIndex);
  return data.map((row, index) => {
    if (index === 0) {
      row.push(columnName);
    } else {
      //    console.log(row);

      if (columnIndex !== -1) {
        let value = (percentage * parseFloat(row[columnIndex])) / 100;
        row.push(value.toFixed(2));
      }
    }
    return row;
  });
}

let addedValueData = addColumn(data, "susikumar", "Sales", 6);
// console.log(addedValueData);

// Function to get the value
function setCountDecimalValueToTheColumn(data, columnName, decimal) {
  let columnIndex = data[0].indexOf(columnName);
  return data.map((row, index) => {
    if (index === 0) {
      return row;
    } else {
      row[columnIndex] = parseFloat(row[columnIndex]).toFixed(decimal);
      return row;
    }
  });
}

let setcountValue = setCountDecimalValueToTheColumn(data, "Profit", 3);
console.log(setcountValue);

// Create Table

let tableElement = document.createElement("table");
let tbodyElement = document.createElement("tbody");

for (let i = 0; i < setcountValue.length; i++) {
  let tr = document.createElement("tr");
  if (i === 0) {
    setcountValue[i].forEach((value) => {
      let th = document.createElement("th");
      th.innerText = value;
      tr.appendChild(th);
    });
  } else {
    setcountValue[i].forEach((value) => {
      let td = document.createElement("td");
      td.innerText = value;
      tr.appendChild(td);
    });
  }
  tbodyElement.appendChild(tr);
}

tableElement.appendChild(tbodyElement);
document.querySelector("body").append(tableElement);
