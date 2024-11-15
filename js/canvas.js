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
            // The values i and j will both loop from -1 to 1 [i.e. -1, 0, 1] and these relative coords will be added to the origin's coord to get the modified neighbour coords.
            // For example, if the origin coord is [1, 2] and the relative coord is [-1, -1], then when the relative coord is applied the final coord will be [0, 1].
            // This exact double for-loop is used quite often when looking for neighbours.
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    // Yes, below works but it's typically considered bad practice to use continue.
                    if (i === 0 && j === 0) continue; //when i === 0 && j === 0, the continue statement is used to skip over the current cell and avoid checking its neighbors.

                    // This is where the modification from above is being applied.
                    let neighborRow = row + i;
                    let neighborCol = col + j;

                    // Check if the neighbor is within bounds of the grid
                    // Remember that the board loops around, meaning if it's out of bounds you need to wrap the position around, back im bounds.
                    // The lines below do not do this...
                    // You'd be better off checking to see if each coord is out of bounds forst, wrapping it if so, and then finally once both coords as validated increment aliveNeighbours as needed.
                    if (neighborRow >= 0 && neighborRow < gridMaxRows && neighborCol >= 0 && neighborCol < gridMaxColumns) {
                        aliveNeighbors += cloneGrid[neighborRow][neighborCol] ? 1 : 0; //If the neighbor is alive add 1, otherwise add 0.
                    }
                }
            }

            // Rule 1 and Rule 3: Any live cell with fewer than 2 or more than 3 live neighbors dies.
            // The === operator takes data types into consideration, so something like 5 === "5" will always be false.
            // Make sure when you use that operator, you're using the right data type. Otherwise, use the == operator.
            if (cloneGrid[row][col] === true) {
                // This works but you don't need both if statements here.
                // An alive cell will stay alive if you don't modify it.
                if (aliveNeighbors < 2 || aliveNeighbors > 3) {
                    array[row][col] = false; // Again, be mindful of data types
                } // Rule 2: Any live cell with exactly 2 or 3 live neighbors survives
                // This else-if can go.
                else if (aliveNeighbors === 2 || aliveNeighbors === 3) {
                    array[row][col] = true; // Data types
                }
              } else {
                // Rule 4: Any dead cell with exactly 3 live neighbors becomes a live cell
                if (aliveNeighbors === 3) {
                    array[row][col] = true; // Data types...
                }
            }
        }
    }
}
