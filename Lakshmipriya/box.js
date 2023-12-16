function countContinuousBoxes(coordinates) {
  const coordinateMap = new Map();
  const visited = new Set();
  let count = 0;

 
  for (const coord of coordinates) {
    const [row, col] = coord.split(',').map(Number);
    coordinateMap.set(`${row}-${col}`, true);
  }

  
  function findNeighbors(row, col) {
    visited.add(`${row}-${col}`);

    const neighbors = [
      [row - 1, col], // Top
      [row, col + 1], // Right
      [row + 1, col], // Bottom
      [row, col - 1], // Left
    ];

    for (const [neighborRow, neighborCol] of neighbors) {
      const neighborKey = `${neighborRow}-${neighborCol}`;
      if (
        coordinateMap.has(neighborKey) &&
        !visited.has(neighborKey)
      ) {
        findNeighbors(neighborRow, neighborCol);
      }
    }
  }

  
  for (const coord of coordinates) {
    const [row, col] = coord.split(',').map(Number);
    const key = `${row}-${col}`;

    if (!visited.has(key)) {
      findNeighbors(row, col);
      count++;
    }
  }

  return count;
}

// Example usage
const coordinates = ["9,5", "2,1", "3,2", "3,1", "2,2", 
"9,4", "1,4", "1,2", "6,1", "7,3", "1,1", "6,3", "6,2", "1,5", "8,5", "8,4", "7,1", "7,2"]

const result = countContinuousBoxes(coordinates);
console.log(result); // Output: 5
