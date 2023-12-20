function plotTheBoxes(inputArray) {
    const vertices = inputArray.map(item => item.split(',').map(Number));
  
    const matrix = buildMatrix(vertices);
    const boxes = getBoxes(matrix);
    
    boxes.forEach(box => {
        console.log(box.map(coord => coord.join(',')).join(' '));
    });

    return boxes.length;
}

function buildMatrix(vertices) {
    const maxRow = Math.max(...vertices.map(vertex => vertex[0]));
    const maxColumn = Math.max(...vertices.map(vertex => vertex[1]));

    const matrix = Array.from({ length: maxRow }, () => Array(maxColumn).fill(0));

    vertices.forEach(([row, column]) => {
        matrix[row - 1][column - 1] = 1;
    });

    return matrix;
}

function getBoxes(matrix) {
    const boxes = [];

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] === 1) {
                const currentBox = [];
                bfs(i, j, currentBox, matrix);
                if (currentBox.length > 1) {
                    boxes.push(currentBox);
                }
            }
        }
    }

    return boxes;
}

function bfs(startRow, startCol, currentBox, matrix) {
    const queue = [[startRow, startCol]];
    
    while (queue.length > 0) {
        const [row, col] = queue.shift();

        if (
            row >= 0 &&
            row < matrix.length &&
            col >= 0 &&
            col < matrix[0].length &&
            matrix[row][col] === 1
        ) {
            matrix[row][col] = 0;
            currentBox.push([row + 1, col + 1]);

            queue.push([row + 1, col]);
            queue.push([row - 1, col]);
            queue.push([row, col + 1]);
            queue.push([row, col - 1]);
        }
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
