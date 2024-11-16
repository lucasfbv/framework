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
startandstopBtn.AddEventListener("click", () => {
    play = !play;
});

// Step Button, steps only once
stepBtn.AddEventListener("click", () => {
    step();
});

// Clear Button
clearBtn.AddEventListener("click", () => {
    play = false;
    // Loop through grid and make all values false.
});
