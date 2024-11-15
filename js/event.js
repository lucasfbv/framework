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