function animate() {

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (let row = 0; row < gridMaxRows; row++) {
        for (let col = 0; col < gridMaxColumns; col++) {
            let width = ctx.canvas.width / gridMaxColumns;
            let height = ctx.canvas.height / gridMaxRows;
            if (array[row][col]) {
                ctx.fillStyle = 'yellow';
            } else {
                ctx.fillStyle = 'grey';
            }

            ctx.beginPath();
            ctx.rect(col * width, row * height, width, height);
            ctx.fill();
            ctx.stroke();

        }
    }

    step();
}

function step() {

    let cloneGrid = array.map(row => row.slice()); //create a copy of an array row.

    for (let row = 0; row < gridMaxRows; row++) {
        for (let col = 0; col < gridMaxColumns; col++) {
            let aliveNeighbors = 0;

            // Check all 8 neighboring cells (up, down, left, right, and diagonals) // THIS FOR LOOP I NEED EXPLANATION
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i === 0 && j === 0) continue; //when i === 0 && j === 0, the continue statement is used to skip over the current cell and avoid checking its neighbors.
                    let neighborRow = row + i;
                    let neighborCol = col + j;

                    // Check if the neighbor is within bounds of the grid
                    if (neighborRow >= 0 && neighborRow < gridMaxRows && neighborCol >= 0 && neighborCol < gridMaxColumns) {
                        aliveNeighbors += cloneGrid[neighborRow][neighborCol] ? 1 : 0; //If the neighbor is alive add 1, otherwise add 0.
                    }
                }
            }

            // Rule 1 and Rule 3: Any live cell with fewer than 2 or more than 3 live neighbors dies
            if (cloneGrid[row][col] === 1) {
                if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                    array[row][col] = 0; // 
                } // Rule 2: Any live cell with exactly 2 or 3 live neighbors survives
                else if (aliveNeighbors === 2 || aliveNeighbors === 3) {
                    array[row][col] = 1;
                }
              } else {
                // Rule 4: Any dead cell with exactly 3 live neighbors becomes a live cell
                if (aliveNeighbors === 3) {
                    array[row][col] = 1;
                }
            }
        }
    }
}
