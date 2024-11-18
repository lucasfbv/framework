canvaBoard.addEventListener('click', function (e) {

    const rect = ctx.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = ctx.canvas.width / gridMaxColumns;
    const height = ctx.canvas.height / gridMaxRows;

    const col = Math.floor(x / width);
    const row = Math.floor(y / height);

    array[row][col] = !array[row][col];

});

// Toggle bool on button click
startandstopBtn.addEventListener("click", (e) => {
    play = !play;
    if(play) {
        startandstopBtn.style.borderColor = "red";
        startandstopBtn.style.color = "red";
    } else {
        startandstopBtn.style.borderColor = "black";
        startandstopBtn.style.color = "black";
    }
});

// Step Button, steps only once
stepBtn.addEventListener("click", () => {
    step();
});

// Clear Button
clearBtn.addEventListener("click", () => {

    play = false;
    for(let i = 0; i < gridMaxRows; i++){
        for(let j = 0; j < gridMaxColumns; j++) {
            array[i][j] = false;
        }
    }

});
