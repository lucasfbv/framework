const canvaBoard = document.getElementById("cnv");
const ctx = canvaBoard.getContext('2d');
const saveBtn = document.querySelector("#save");
const loadBtn = document.querySelector("#load");
const startandstopBtn = document.querySelector("#startandstop");
const stepBtn = document.querySelector("#step");
const clearBtn = document.querySelector("#clear");

ctx.canvas.width = 750;
ctx.canvas.height = 500;
const gridMaxRows = 10;
const gridMaxColumns = 15;

const array = new Array(gridMaxRows);
for (let i = 0; i < gridMaxRows; i++) {
    array[i] = new Array(gridMaxColumns).fill(false);
}

// Bool For Playing Steps, false by default
let play = false;
let frame = 0;
