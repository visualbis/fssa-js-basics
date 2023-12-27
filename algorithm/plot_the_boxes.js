function plotTheBoxes(inputArray) {
    const vertices = inputArray.map(item => item.split(',').map(Number));
    const sortedVertices = vertices.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
 
    const maxRow = Math.max(...sortedVertices.map(vertex => vertex[0]));
    const maxColumn = Math.max(...sortedVertices.map(vertex => vertex[1]));
 
    const matrix = Array.from({ length: maxRow }, () => Array(maxColumn).fill(0));
 
    sortedVertices.forEach(([row, column]) => {
      matrix[row - 1][column - 1] = 1;
    });
   
    let matrixPlot = matrix.map(row => row.join(' ')).join('\n')
    console.log(matrixPlot);
 
    const boxes = getBoxes(matrix);
    return boxes.length;
 
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
 
    function getBoxes(matrix) {
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
  }
 
const inputArray1 = ["9,5", "2,1", "3,2", "3,1", "2,2", "9,4", "1,4", "1,2", "6,1", "7,3", "1,1", "6,3", "6,2", "1,5", "8,5", "8,4", "7,1", "7,2"];
const result1 = plotTheBoxes(inputArray1);
console.log(result1);  
 
const inputArray2 = ["1,1", "2,2", "3,3", "4,4", "5,5", "5,6", "6,6"];
const result2 = plotTheBoxes(inputArray2);
console.log(result2);
 
const inputArray3 = ["1,1", "2,2", "3,3", "4,4", "5,5", "1,5", "2,4", "3,3", "4,2", "5,1"];
const result3 = plotTheBoxes(inputArray3);
console.log(result3);