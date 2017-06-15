var cols = 20;
var rows = 15;
var scl = 20;
var btnHeight = 20;
var grid = [];
var btns = [];
var debug = false;

function setup() {
	createCanvas(cols * scl, rows * scl);
	frameRate(1);

	initGrid();
	randomGrid();
}

function draw() {
	background(50,50,50);

	for(var r = 0; r < rows; r++){
		for(var c = 0; c < cols; c++){
			grid[c][r].update();
			grid[c][r].show();
		}
	}
	for(var r = 0; r < rows; r++){
		for(var c = 0; c < cols; c++){
			grid[c][r].nextGen();
		}
	}
}

function initGrid(){
	for(var c = 0; c < cols; c++){
		grid[c] = [];
	}
}

function randomGrid(density = 0.5){
	for(var r = 0; r < rows; r++){
		for(var c = 0; c < cols; c++){
			if(random() <= density){
				//have to add empty cells on the borders and can't do for(1 to row -1) else there is just no cell
				if(!(r == 0 || c == 0 || c == cols - 1 || r == rows - 1)){
					grid[c][r] = new Cell(c, r, 1);
				}else {
					grid[c][r] = new Cell(c, r, 0);
				}
			}else{
				grid[c][r] = new Cell(c, r, 0);
			}
		}
	}
}
