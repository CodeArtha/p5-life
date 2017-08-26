var cols = 10;
var rows = 10;
var scl = 20;
var btnHeight = 50;
var btnWidth = 150;
var btnRad = 5;
var grid = [];
var btns = [];
var debug = false;
var score;
var drawFrameRate = 30;
var updateFrameRate = drawFrameRate / 1;
var frameCounter = updateFrameRate;

function setup() {
	//creating the frame in which everything will be drown.
	createCanvas((cols * scl) + btnWidth + scl, rows * scl);
	frameRate(drawFrameRate); // number of times per second the function draw() is called

	//Button(lbl, fct, type, status, posX, posY, w, h)
	btns.push(new Button("New Random", "resetGrid", "flash", 1, cols * scl + scl/2, 0, btnWidth, btnHeight));
	btns.push(new Button("Auto Play", "forward(0)", "toggle", 1, cols * scl + scl/2, btnHeight, btnWidth, btnHeight));
	btns.push(new Button("Next Move", "forward(1)", "flash", 1, cols * scl + scl/2, 2*btnHeight, btnWidth, btnHeight));

	//initialisation of the game grid in memory and filling it with random cells.
	initGrid();
	randomGrid();
}

function draw() {
	frameCounter++;
	if(frameCounter >= updateFrameRate){
		frameCounter = 0;
		score = 0;
		// updating the cells then drawing them on screen.
		// updating changes the current state to the state stored in NextGen
		for(var r = 0; r < rows; r++){
			for(var c = 0; c < cols; c++){
				grid[c][r].update();
				grid[c][r].show();
			}
		}

		// calculating state of cells in next generation
		// warning: can't be added to the loop responsible for updating and drawing the cells
		// or else neighbour count will be off.
		for(var r = 0; r < rows; r++){
			for(var c = 0; c < cols; c++){
				grid[c][r].nextGen();
			}
		}
	}

	//drawing buttons and score
	for (var i = 0; i < btns.length; i++) {
		btns[i].show();
	}
	fill(123);
	textSize(15);
	text("Score: " + score, scl * cols * 0.5, 0.6*scl);
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
			console.log("button "+ i+" clicked");
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

function encodeGrid(){
	var encoded = '';

	// as we will be reading the grid 3 cells by 3 we first flatten the 2D array to avoid colum modulo hassel
	var arr = [];
	for (row of grid) for (e of row) arr.push(e);

	// we start at cols and stop cols before the end to skip most of
	// the black border who are allways dead cells
	var max = (cols*rows) - cols;
	for(var pos = cols; pos <= max ; pos = pos + 3){
		var a = arr[pos].state.toString();
		var b = arr[pos+1].state.toString();
		var c = arr[pos+2].state.toString();

		encoded = encoded + a + b + c;
	}

	arr = null;
	return encoded;
}
