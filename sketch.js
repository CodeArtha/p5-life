var cols = 20;
var rows = 15;
var scl = 20;
var btnHeight = 50;
var btnWidth;
var btnRad = 5;
var grid = [];
var btns = [];
var debug = false;
var score;

function setup() {
	createCanvas(cols * scl, rows * scl + btnHeight);
	frameRate(1);

	//Button(lbl, fct, type, status, posX, posY, w, h)
	btns.push(new Button("Reset", "resetGrid", "flash", 1, 0, height - btnHeight, 150, btnHeight - 2));

	initGrid();
	randomGrid();
}

function draw() {
	//background(105, 105, 105);

	for(var r = 0; r < rows; r++){
		for(var c = 0; c < cols; c++){
			score = 0;
			grid[c][r].update();
			grid[c][r].show();
		}
	}
	fill(123);
	textSize(12);
	text("Score: ", 20, 20);
	for(var r = 0; r < rows; r++){
		for(var c = 0; c < cols; c++){
			grid[c][r].nextGen();
		}
	}
	for (var i = 0; i < btns.length; i++) {
		btns[i].show();
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

function mouseClicked(){
	//sending signal to all buttons
	for (var i = 0; i < btns.length; i++) {
		if(btns[i].isClicked(mouseX, mouseY)){
			btns[i].onClick();
			break;
		}
	}
	//sending signal to all cells
	for(var r = 0; r < rows; r++){
		for(var c = 0; c < cols; c++){
			if(grid[c][r].isClicked(mouseX, mouseY)){
				grid[c][r].onClick();
				break;
			}
		}
	}
}
