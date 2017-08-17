var cols = 20;
var rows = 15;
var scl = 20;
var btnHeight = 50;
var btnWidth = 150;
var btnRad = 5;
var grid = [];
var btns = [];
var debug = false;
var score;

function setup() {
	//creating the frame in which everything will be drown.
	createCanvas((cols * scl) + btnWidth + scl, rows * scl);
	frameRate(0.5);

	//Button(lbl, fct, type, status, posX, posY, w, h)
	btns.push(new Button("Reset", "resetGrid", "flash", 1, cols * scl + scl/2, 0, btnWidth, btnHeight));

	//initialisation of the game grid in memory and filling it with random cells.
	initGrid();
	randomGrid();
}

function draw() {
	// updating the cells then drawing them on screen.
	// updating changes the current state to the state stored in NextGen
	for(var r = 0; r < rows; r++){
		for(var c = 0; c < cols; c++){
			score = 0;
			grid[c][r].update();
			grid[c][r].show();
		}
	}

	// calculating state of cells in next generation
	// warning: can't be added to the loop responsible for updating and drawing the cells
	for(var r = 0; r < rows; r++){
		for(var c = 0; c < cols; c++){
			grid[c][r].nextGen();
		}
	}

	//drawing buttons and score
	for (var i = 0; i < btns.length; i++) {
		btns[i].show();
	}
	fill(123);
	textSize(12);
	text("Score: " + score, scl, 0.8*scl);
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
