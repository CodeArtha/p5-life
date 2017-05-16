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
	this.nextState = 1;

	this.show = function(){
		//drawing whole cell in it's current state
		if(this.state == 0){
			fill(0);
			rect(this.x, this.y, scl, scl);
		} else if( this.state == 1) {
			fill(255);
			rect(this.x, this.y, scl, scl);
		}
		//drawing indicator square in the center of the cell representing it's next state
		if(this.nextState == 0){
			fill(0);
			rect(this.x + (scl/2) - (scl/10), this.y + (scl/2) - (scl/10), scl/5, scl/5);
		} else if (this.nextState == 1) {
			fill(255);
			rect(this.x + (scl/2) - (scl/10), this.y + (scl/2) - (scl/10), scl/5, scl/5);
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
