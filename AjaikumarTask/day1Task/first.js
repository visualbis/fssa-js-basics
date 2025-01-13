function percentageFind(data, value) {

var table = document.getElementById("myTable");

var headerRow = table.insertRow(0);
for (var i = 0; i < data[0].length; i++) {
    var headerCell = headerRow.insertCell(i);
    headerCell.innerHTML = data[0][i];
}

    var headerCell = headerRow.insertCell(4);
    headerCell.innerHTML = "Profit %";
    
    var headerCell = headerRow.insertCell(5);
    headerCell.innerHTML = "sales %";

for (var i = 1; i < data.length; i++) {
    var row = table.insertRow(i);
    for (var j = 0; j < data[i].length; j++) {
    var cell = row.insertCell(j);
    if (isNaN(parseFloat(data[i][j]))) {
        cell.innerHTML = data[i][j];
    } else {
        var roundedNumber = parseFloat(data[i][j]).toFixed(value);
        cell.innerHTML = roundedNumber;
    }
    }

    for (var j = 4; j <= 5; j++) {
  var cell = row.insertCell(j);
  if(j == 4) {
    var roundedNumber = parseFloat(data[i][2] * 1.1).toFixed(2);
    cell.innerHTML = roundedNumber;
  } else {
    var roundedNumber = parseFloat(data[i][3] * 1.05).toFixed(2);
    cell.innerHTML = roundedNumber;
  }
}
}

}
