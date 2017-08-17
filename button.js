/* lbl = text displayed in the Button
 * fct = name of the function to be executed when clicked
 * type = eighter toggle or flash
 * status = 1 or 0 if it starts as active or inactive
 */
function Button(lbl, fct, type, state, posX, posY, w, h){
    this.lbl = lbl;
    this.fct = fct;
    this.typ = type;
    this.state = state;
    this.xmin = posX;
    this.xmax = posX + w;
    this.w = w;
    this.ymin = posY;
    this.ymax = posY + h;
    this.h = h;


    this.show = function(){
		//drawing the button
        if(this.state){
            fill(0, 204, 0);
        }else{
            fill(204, 0, 0);
        }
        rect(this.xmin, this.ymin, this.w, this.h, btnRad);

		//drawing text over it
		fill(0, 0, 150);
		textSize(25);
		textAlign(CENTER, CENTER);
		text(lbl, this.xmin + 0.5*btnWidth, this.ymin + 0.5*btnHeight);
    }

    this.onClick = function() {
        if(this.types == "toggle"){
            window[this.action]();
            this.state = !this.state;
            this.show();
        }
        if(this.types == "flash"){
            window[this.action]();
            this.state = !this.state;
            this.show();
            sleep(0.5);
            this.state = !this.state;
            this.show();
        }
    }

    this.isClicked = function(ix, iy){
		return (ix >= this.xmin &&
                ix <= this.xmax &&
                iy >= this.ymin &&
                iy <= this.ymax) ? true : false;
	}
}
