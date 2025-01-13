let InputData = [
    "9,5", "2,1", "3,2", "3,1", "2,2", "9,4", "1,4", "1,2", "6,1", "7,3", "1,1", "6,3", "6,2", "1,5", "8,5", "8,4", "7,1", "7,2", "3,4", "3,5", "4,4", "4,5"
  ];
  
  let maxRow = -Infinity;
  let maxColumn = -Infinity;
  
  for (let i = 0; i < InputData.length; i++) {
    let entry = InputData[i];
    let parts = entry.split(",");
    let row = parseInt(parts[0]);
    let column = parseInt(parts[1]);
  
    maxRow = Math.max(maxRow, row);
    maxColumn = Math.max(maxColumn, column);
  }
  
  let mappedData = InputData.map((entry) => {
    let parts = entry.split(",");
    let column = parseInt(parts[0]);
    let row = parseInt(parts[1]);
    return { column, row };
  });
  
  let Array = [];
  for (let i = 0; i < maxRow; i++) {
    Array[i] = [];
    for (let j = 0; j < maxColumn; j++) {
      Array[i][j] = 0;
    }
  }
  
  for (let i = 0; i < mappedData.length; i++) {
    let column = mappedData[i].column - 1;
    let row = mappedData[i].row - 1;
    Array[column][row] = 1;
  }
  
Array.forEach((item)=> {
    console.log(item)
})  
  let value = getGridBoxes(Array);
  console.log(value);
  console.log("The Boxes count is : " + value.length);
  
  function getGridBoxes(grid) {
    function continuousPlots(row, column, currentBox) {
      if (
        row >= 0 &&
        row < grid.length &&
        column >= 0 &&
        column < grid[0].length &&
        grid[row][column] === 1
      ) {
        grid[row][column] = 0;
        currentBox.push({ row, column: column });
  
        continuousPlots(row + 1, column, currentBox);
        continuousPlots(row - 1, column, currentBox);
        continuousPlots(row, column + 1, currentBox);
        continuousPlots(row, column - 1, currentBox);
      }
    }
  
    const boxArray = [];
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (grid[i][j] === 1) {
          const currentBox = [];
          continuousPlots(i, j, currentBox);
          if (currentBox.length > 1) {
            boxArray.push(currentBox);
          }
        }
      }
    }
  
    return boxArray;
  }
  