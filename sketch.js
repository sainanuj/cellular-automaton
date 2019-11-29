let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "pink";

window.onresize = () => {
    location.reload();
}

function make2Darray(rows, cols) {
    let arr = new Array(rows);
    for (let i=0; i<rows; i++) {
        arr[i] = new Array(cols);
    }
    return arr;
}

let grid;
let rows;
let cols;
let resolution = 10;

function setup() {
    rows = Math.floor(canvas.width/resolution);
    cols = Math.floor(canvas.height/resolution);
    grid = make2Darray(rows, cols);
    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            grid[i][j] = Math.floor(Math.random()*2);
        }
    }
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            let x = i*resolution;
            let y = j*resolution;
            if (grid[i][j]==1) {
                ctx.fillStyle = "black";
                ctx.strokeStyle = "white";
                ctx.fillRect(x, y, resolution, resolution);
                ctx.beginPath();
                ctx.lineWidth = "3";
                ctx.rect(x, y, resolution, resolution);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
    
    let next = make2Darray(rows, cols);

    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            let state = grid[i][j];
            if (i>0 || j>0 || i<rows-1 || j<cols-1) {
                let neighbours = countNeighbours(grid, i, j);
                if (state == 0 && neighbours==3) {
                    next[i][j] = 1;
                } else if (state == 1 && (neighbours < 2 || neighbours > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = state;
                }
            } else {
                next[i][j] = state;
            }
        }
    }

    grid = next;

    requestAnimationFrame(draw);
}

function countNeighbours(grid, x, y) {
    let sum = 0;
    for (let i=-1; i<2; i++) {
        for (let j=-1; j<2; j++) {
            let row = (x+i+rows)%rows;
            let col = (y+j+cols)%cols;
            sum += grid[row][col];
        }
    }
    sum -= grid[x][y];
    return sum;
}

setup();
draw();