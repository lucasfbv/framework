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

    // Animation should only play when play button is pressed.
    if (play) {
        step();
    }
}

function step() {

    // What you had works but you were technically mapping the columns, not rows.
    let cloneGrid = array.map(col => col.slice()); //create a copy of an array columns*.

    for (let row = 0; row < gridMaxRows; row++) {
        for (let col = 0; col < gridMaxColumns; col++) {
            let aliveNeighbors = 0;

            // Check all 8 neighboring cells (up, down, left, right, and diagonals)
            // Explanation: This double for-loop have the i and j indexes mapped to relative coords using the current row and column as the origin.
            // The values i and j will both loop from -1 to 1 [i.e. -1, 0, 1] and these relative coords will be added to the origin's coords to get the modified neighbour coords.
            // For example, if the origin coords are [1, 2] and the relative coords are [-1, -1], then when the relative coords are applied the final coord will be [0, 1].
            // This exact double for-loop is used quite often when looking for neighbours.
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (i !== 0 && j !== 0) {

                        let neighborRow = row + i;
                        let neighborCol = col + j;

                        // Wrap the row and column around if out of bounds
                        neighborRow = (neighborRow + gridMaxRows) % gridMaxRows;
                        neighborCol = (neighborCol + gridMaxColumns) % gridMaxColumns;

                        // Add to aliveNeighbors if the neighbor is alive
                        aliveNeighbors += cloneGrid[neighborRow][neighborCol] ? 1 : 0;

                    }
                }

                if (cloneGrid[row][col] && (aliveNeighbors < 2 || aliveNeighbors > 3)) {  // Rule 1 and Rule 3: Any live cell with fewer than 2 or more than 3 live neighbors dies.
                    array[row][col] = false;
                } else if (!cloneGrid[row][col] && aliveNeighbors === 3) { // Rule 2: Any live cell with exactly 2 or 3 live neighbors survives
                    array[row][col] = true;
                } else { // Rule 4: Any dead cell with exactly 3 live neighbors becomes a live cell
                    if (aliveNeighbors === 3) {
                        array[row][col] = true; 
                    }
                }
            }
        }
    }
}
