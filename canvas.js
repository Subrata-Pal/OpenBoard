let pencilColorElem = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let pencilColor = "black";
let eraserColor = "white";
let pencilWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;
let clearScreen = document.querySelector(".clear-screen");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");

let undoRedoTracker = []; //Data
let track = 0; // Represent which action from tracker array


let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mousedown = false;


const tool = canvas.getContext('2d');

pencil.addEventListener("click",(e)=>{
tool.lineWidth = pencilWidth;
tool.strokeStyle = pencilColor;
})
eraser.addEventListener("click",(e)=>{
    tool.lineWidth = eraserWidth;
    tool.strokeStyle = eraserColor;
})

/*ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(100 , 150)
// draw your path
ctx.stroke();
tool.strokeStyle = "red";
tool.lineWidth = "3";*/

canvas.addEventListener('mousedown',(e)=>{
    mousedown = true;
    tool.beginPath();
    tool.moveTo(e.clientX,e.clientY);

    pencilToolCont.style.display = "none";
    eraserToolCont.style.display = "none"
})
canvas.addEventListener('mousemove',(e)=>{
    if(mousedown === true)
    {
    tool.lineTo(e.clientX,e.clientY);
    tool.stroke();
    }
})
canvas.addEventListener('mouseup',(e)=>{
    mousedown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length-1;
})

pencilColorElem.forEach((colorElem)=>{
    colorElem.addEventListener("click",(e)=>{
       let color = colorElem.classList[0];
       pencilColor = color;
       tool.strokeStyle = pencilColor;
    })
})

pencilWidthElem.addEventListener("change",(e)=>{
    pencilWidth = pencilWidthElem.value;
    tool.lineWidth = pencilWidth;
})
eraserWidthElem.addEventListener("change",(e)=>{
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
})

clearScreen.addEventListener("click",(e)=>{
    tool.fillStyle = "white";
    tool.fillRect(0, 0, canvas.width, canvas.height);
})

download.addEventListener("click",(e)=>{

    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
})

