/**
Cell state:
0 = dead (black)
1 = live (white)

Cell nextState:
0 = going to die (black)
1 = born (white)
*/

function Cell(c, r, s){
	this.col = c;
	this.row = r;
	this.x = c*scl;
	this.y = r*scl;
	this.state = s;
	this.nextState;

	this.show = function(){
		if(this.state == 0){
			fill(0,0,0);
			rect(this.x, this.y, scl, scl);
		} else if( this.state == 1) {
			fill(255, 255, 255);
			rect(this.x, this.y, scl, scl);
		}
	}

	this.update = function(){
		if(this.col == 0 || this.col == cols - 1 || this.row == 0 || this.row == rows - 1){
			this.state = 0;
			this.nextState = 0;
		}else{
			n = this.countNeighbors();
		}
	}

	this.countNeighbors = function(){
		var count = 0;

		if(grid[this.col - 1][this.row -1 ].state != 0) count++;
		if(grid[this.col][this.row - 1].state != 0) count++;
		if(grid[this.col + 1][this.row - 1].state != 0) count++;
		if(grid[this.col - 1][this.row].state != 0) count++;
		if(grid[this.col + 1][this.row].state != 0) count++;
		if(grid[this.col - 1][this.row + 1].state != 0) count++;
		if(grid[this.col][this.row + 1].state != 0) count++;
		if(grid[this.col + 1][this.row + 1].state != 0) count++;

		return count;
	}
}
