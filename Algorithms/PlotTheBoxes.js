let data = [
  "9,5",
  "2,1",
  "3,2",
  "3,1",
  "2,2",
  "9,4",
  "1,4",
  "1,2",
  "6,1",
  "7,3",
  "1,1",
  "6,3",
  "6,2",
  "1,5",
  "8,5",
  "8,4",
  "7,1",
  "7,2",
];

// let data = [
//   "1,1",
//   "2,2",
//   "3,3",
//   "4,4",
//   "5,5",
//   "1,5",
//   "2,4",
//   "3,3",
//   "4,2",
//   "5,1",
// ];

// Initialize variables to store maximum row and column values
let maxRow = -Infinity;
let maxColumn = -Infinity;

// Iterate through the data array
for (let i = 0; i < data.length; i++) {
  let [row, column] = data[i].split(",");

  row = parseInt(row);
  column = parseInt(column);

  maxRow = Math.max(maxRow, row);
  maxColumn = Math.max(maxColumn, column);
}

// Map the value as column and row
let mappedData = data.map((entry) => {
  let [column, row] = entry.split(",").map(Number);
  return { column, row };
});

// Initialize the values to the array
let arr = Array.from({ length: maxRow }, () => Array(maxColumn).fill(0));

// Plot the values
for (let i = 0; i < mappedData.length; i++) {
  arr[mappedData[i].column - 1][mappedData[i].row - 1] = 1;
}
console.log(arr);
// Call the get Boxes function
let value = getBoxes(arr);
console.log(value);
console.log("The Boxes count is : " + value.length);

// Get Boxes to function get the contiguos plots count

function getBoxes(matrix) {
  function contiguousPlots(row, col, currentBox) {
    if (
      row >= 0 &&
      row < matrix.length &&
      col >= 0 &&
      col < matrix[0].length &&
      matrix[row][col] === 1
    ) {
      matrix[row][col] = 0;
      currentBox.push({ row, col });

      contiguousPlots(row + 1, col, currentBox);
      contiguousPlots(row - 1, col, currentBox);
      contiguousPlots(row, col + 1, currentBox);
      contiguousPlots(row, col - 1, currentBox);
    }
  }

  const boxes = [];
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === 1) {
        const currentBox = [];
        contiguousPlots(i, j, currentBox);
        if (currentBox.length > 1) {
          boxes.push(currentBox);
        }
      }
    }
  }

  return boxes;
}
