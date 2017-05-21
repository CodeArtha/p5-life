var cols = 20;
var rows = 15;
var scl = 20;
var grid = [];
var debug = false;

function setup() {
	createCanvas(cols * scl, rows * scl);
	frameRate(1);

	initGrid();
	randomGrid();
}

function draw() {
	background(50);

	for(var r = 0; r < rows; r++){
		for(var c = 0; c < cols; c++){
			grid[c][r].update();
			grid[c][r].show();
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
				grid[c][r] = new Cell(c, r, 1);
			}else{
				grid[c][r] = new Cell(c, r, 0);
			}
		}
	}
}
