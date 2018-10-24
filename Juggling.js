<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Gamedev Canvas Workshop</title>
	<style>
		* { padding: 0; margin: 0; }
		canvas { background: #eee; display: block; margin: 0 auto; margin-top: 100px; }
	</style>
</head>
<body>
<canvas id="myCanvas" width="480" height="320"></canvas>
<label id="minutes">00</label>:<label id="seconds">00</label>

<script>
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


var x_bB = canvas.width -220; var x_gB = canvas.width -250; var x_rB = canvas.width -280;
var y_bB = canvas.height -250; var y_gB = canvas.height -250; var y_rB = canvas.height -250;

var dx_bB = 0; var dx_gB = 0; dx_rB = 0;
var dy_bB = 1; var dy_gB = 1; dy_rB = 1;
var ballRadius = 10;

var rArrPressed = false;
var lArrPressed = false;
var APressed = false;
var DPressed = false;
var upArrPressed = false;
var EPressed = false;

var handHeight = 15;
var handWidth = 50;
var handX = (canvas.width-handWidth)/2;
var handX2 = (canvas.width-handWidth)/2;

var sec = 0;
function pad ( val ) { return val > 9 ? val : "0" + val; }
setInterval(function(){
document.getElementById("seconds").innerHTML=pad(++sec%60);
document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
}, 1000);

function blueBall() {
	ctx.beginPath();
	ctx.arc(x_bB, y_bB, ballRadius,0,Math.PI*2);
	ctx.fillStyle = "rgba(0,0,260,0.9)";
	ctx.fill();
	ctx.closePath();
}
function greenBall() {
	ctx.beginPath();
	ctx.arc(x_gB, y_gB, ballRadius,0,Math.PI*2);
	ctx.fillStyle = "green";
	ctx.fill();
	ctx.closePath();
}
function redBall() {
	ctx.beginPath();
	ctx.arc(x_rB, y_rB, ballRadius,0,Math.PI*2);
	ctx.fillStyle = "#f00000";
	ctx.fill();
	ctx.closePath();
}

function leftHand() {
	ctx.beginPath();
	ctx.rect(handX2, canvas.height-handHeight, handWidth, handHeight);
	ctx.fillStroke = "#000000";
	ctx.stroke();
	ctx.closePath();
}
function rightHand() {
	ctx.beginPath();
	ctx.rect(handX, canvas.height-handHeight, handWidth, handHeight);
	ctx.fillStroke = "#000000";
	ctx.stroke();
	ctx.closePath();
}

function bBhitSideWalls() {return x_bB+dx_bB > canvas.width-ballRadius || x_bB + dx_bB < ballRadius}
function bBhitTop() {return y_bB + dy_bB < ballRadius}
function bBhitBottom() {return y_bB + dy_bB > canvas.height-ballRadius}
function bBInRightHand() {return x_bB+5 >= handX && x_bB+5 < handX + (handWidth + 10)}
function bBInRHandHoriz() {return x_bB > handX && x_bB <= handX + handWidth}
function bBInLeftHand() {return x_bB+5 >= handX2 && x_bB+5 < handX2 + (handWidth + 10)}
function bBInLHandHoriz() {return handX2 && x_bB <= handX2 + handWidth}

function bBMoveBounce() {
	x_bB += dx_bB;
	y_bB += dy_bB;

	if(bBhitSideWalls()) {
		dx_bB = -dx_bB;
	}
	if (bBhitTop()) {
		dy_bB = -dy_bB;
	} 
	if (bBhitBottom()) {
		if (bBInRightHand()) {
			x_bB = handX+15;
			y_bB = canvas.height-9
			dy_bB = 0;
			dx_bB = 0;
		} 
		if(rArrPressed && bBInRHandHoriz()) {
				dx_bB += 7;
		}
		if (lArrPressed && bBInRHandHoriz()) {
				dx_bB -= 7;
		}
		if (upArrPressed && x_bB <= handX + handWidth && y_bB > canvas.height - 20) {
			dx_bB = 0;
			dy_bB = -1;
			x_bB += dx_bB;
			y_bB += dy_bB;
		}
	}
	if (bBhitBottom()) {
		if (bBInLeftHand()) {
			x_bB = handX2+35;
			y_bB = canvas.height-9
			dy_bB = 0;
			dx_bB = 0;
		} 
		if(DPressed && bBInLHandHoriz()) {
				dx_bB += 7;
		}
		if (APressed && bBInLHandHoriz()) {
				dx_bB -= 7;
		}
		if (EPressed && x_bB <= handX2 + handWidth && y_bB > canvas.height - 20) {
			dx_bB = 0;
			dy_bB = -1;
			x_bB += dx_bB;
			y_bB += dy_bB;
		}
	} 
}
function gBMoveBounce() {
	x_gB += dx_gB;
	y_gB += dy_gB;

	if(x_gB+dx_gB > canvas.width-ballRadius || x_gB+dx_gB < ballRadius) {
		dx_gB = -dx_gB;
	}
	if (y_gB + dy_gB < ballRadius) {
		dy_gB = -dy_gB;
	} 
	if (y_gB + dy_gB > canvas.height-ballRadius) {
		if (x_gB+5 >= handX && x_gB+5 < handX + (handWidth + 10)) {
			x_gB = handX+15;
			y_gB = canvas.height-9
			dy_gB = 0;
			dx_gB = 0;
		} 
		if(rArrPressed && x_gB > handX && x_gB <= handX + handWidth) {
				dx_gB += 7;
		}
		if (lArrPressed && x_gB > handX && x_gB <= handX + handWidth) {
				dx_gB -= 7;
		}
		if (upArrPressed && x_gB <= handX + handWidth && y_gB > canvas.height - 20) {
			dx_gB = 0;
			dy_gB = -1;
			x_gB += dx_gB;
			y_gB += dy_gB;
		}
	}
	if (y_gB + dy_gB > canvas.height-ballRadius) {
		if (x_gB+5 >= handX2 && x_gB+5 < handX2 + (handWidth + 10)) {
			x_gB = handX2+35;
			y_gB = canvas.height-9
			dy_gB = 0;
			dx_gB = 0;
		} 
		if(DPressed && x_gB > handX && x_gB <= handX2 + handWidth) {
				dx_gB += 7;
		}
		if (APressed && x_gB > handX && x_gB <= handX2 + handWidth) {
				dx_gB -= 7;
		}
		if (EPressed && x_gB <= handX2 + handWidth && y_gB > canvas.height - 20) {
			dx_gB = 0;
			dy_gB = -1;
			x_gB += dx_gB;
			y_gB += dy_gB;
		}
	} 

}
function rBMoveBounce() {
	x_rB += dx_rB;
	y_rB += dy_rB;

	if(x_rB+dx_rB > canvas.width-ballRadius || x_rB + dx_rB < ballRadius) {
		dx_rB = -dx_rB;
	}
	if (y_rB + dy_rB < ballRadius) {
		dy_rB = -dy_rB;
	} 
	if (y_rB + dy_rB > canvas.height-ballRadius) {
		if (x_rB+5 >= handX && x_rB+5 < handX + (handWidth + 10)) {
			x_rB = handX+15;
			y_rB = canvas.height-9
			dy_rB = 0;
			dx_rB = 0;
		} 
		if(rArrPressed && x_rB > handX && x_rB <= handX + handWidth) {
				dx_rB += 7;
		}
		if (lArrPressed && x_rB > handX && x_rB <= handX + handWidth) {
				dx_rB -= 7;
		}
		if (upArrPressed && x_rB <= handX + handWidth && y_rB > canvas.height - 40) {
			dx_rB = 0;
			dy_rB = -1;
			x_rB += dx_rB;
			y_rB += dy_rB;
		}
	}
	if (y_rB + dy_rB > canvas.height-ballRadius) {
		if (x_rB+5 >= handX2 && x_rB+5 < handX2 + (handWidth + 10)) {
			x_rB = handX2+35;
			y_rB = canvas.height-9
			dy_rB = 0;
			dx_rB = 0;
		} 
		if(DPressed && x_rB > handX2 && x_rB <= handX2 + handWidth) {
				dx_rB += 7;
		}
		if (APressed && x_rB > handX && x_rB <= handX2 + handWidth) {
				dx_rB -= 7;
		}
		if (EPressed && x_rB <= handX2 + handWidth && y_rB > canvas.height - 20) {
			dx_rB = 0;
			dy_rB = -1;
			x_rB += dx_rB;
			y_rB += dy_rB;
		}
	} 
}
function bBGravity() {
	if (y_bB+ballRadius > canvas.height) {
		dy_bB = -dy_bB*0.4;
		dx_bB = dx_bB*0.5;
		y_bB = canvas.height-ballRadius;
	}
	if(y_bB+ballRadius > 10) {
		dy_bB += 0.1;
	}
	if (upArrPressed && x_bB > handX && x_bB < handX + handWidth && y_bB > canvas.height - 20) {
		if (upArrPressed && lArrPressed) {
			dx_bB = -1.5;
		}
		if (upArrPressed && rArrPressed) {
			dx_bB = 1.5;
		}
			dy_bB = -7;
			x_bB += dx_bB;
			y_bB += dy_bB;
	}
	if (EPressed && x_bB > handX2 && x_bB < handX2 + handWidth && y_bB > canvas.height - 20) {
		if (EPressed && APressed) {
			dx_bB = -1.5;
		}
		if (EPressed && DPressed) {
			dx_bB = 1.5;
		}
			dy_bB = -7;
			x_bB += dx_bB;
			y_bB += dy_bB;
	}
}

function rBGravity() {
	if (y_rB+ballRadius > canvas.height) {
		dy_rB = -dy_rB*0.4;
		dx_rB = dx_rB*0.5;
		y_rB = canvas.height-ballRadius;
	}
	if(y_rB+ballRadius > 10) {
		dy_rB += 0.1;
	}
	if (upArrPressed && x_rB > handX && x_rB < handX + handWidth && y_rB > canvas.height - 20) {
		if (upArrPressed && lArrPressed) {
			dx_rB = -1.5;
		}
		if (upArrPressed && rArrPressed) {
			dx_rB = 1.5;
		}
			dy_rB = -7;
			x_rB += dx_rB;
			y_rB += dy_rB;
	}
	if (EPressed && x_rB > handX2 && x_rB < handX2 + handWidth && y_rB > canvas.height - 20) {
		if (EPressed && APressed) {
			dx_rB = -1.5;
		}
		if (EPressed && DPressed) {
			dx_rB = 1.5;
		}
			dy_rB = -7;
			x_rB += dx_rB;
			y_rB += dy_rB;
	}
}
function gBGravity() {
	if (y_gB+ballRadius > canvas.height) {
		dy_gB = -dy_gB*0.4;
		dx_gB = dx_gB*0.5;
		y_gB = canvas.height-ballRadius;
	}
	if(y_gB+ballRadius > 10) {
		dy_gB += 0.1;
	}
	if (upArrPressed && x_gB > handX && x_gB <= handX + handWidth && y_gB > canvas.height - 20) {
		if (upArrPressed && lArrPressed) {
			dx_gB = -1.5;
		}
		if (upArrPressed && rArrPressed) {
			dx_gB = 1.5;
		}
			dy_gB = -7;
			x_gB += dx_gB;
			y_gB += dy_gB;
	}
	if (EPressed && x_gB > handX2 && x_gB <= handX2 + handWidth && y_gB > canvas.height - 20) {
		if (EPressed && APressed) {
			dx_gB = -1.5;
		}
		if (EPressed && DPressed) {
			dx_gB = 1.5;
		}
			dy_gB = -7;
			x_gB += dx_gB;
			y_gB += dy_gB;
	}
}
function ballsCollide() {
	if((x_bB-x_rB)*(x_bB - x_rB) + (y_bB-y_rB)*(y_bB-y_rB) <= ballRadius*4) {
			//dy_rB = -dy_rB;
		    //dy_bB = -dy_bB;
			dx_rB = -dx_rB;
			dx_bB = -dx_bB;
	}
	if((x_bB - x_gB)*(x_bB - x_gB) + (y_bB - y_gB)*(y_bB - y_gB) <= ballRadius*4) {
			dx_bB = -dx_bB;
			dx_gB = -dx_gB;
	}
	if((x_rB - x_gB)*(x_rB - x_gB) + (y_rB - y_gB)*(y_rB - y_gB) <= ballRadius*4) {
			dx_rB = -dx_rB;
			dx_gB = -dx_gB;
	}
}

function lHMoveBounce() {
	if(DPressed && handX2+5 < canvas.width-handWidth) {
		handX2 += 5 ;
	}
	if(APressed && handX2 > 0) {
		handX2 -= 7;
	}
}
function rHMoveBounce() {
	if(rArrPressed && handX+5 < canvas.width-handWidth) {
		handX += 7;
	}
	if(lArrPressed && handX > 0) {
		handX -= 5;
	}
	// if(rArrPressed && canvas.height-60 > y_bB+dy_bB && handX+5 >= x_bB+dx_bB) {
	// 	handX += 1;
	// }
}

function threeInHand() {
	if(x_rB == x_gB && y_rB == y_gB || x_rB == x_bB && y_rB == y_bB) {
		if (EPressed || upArrPressed) {
			dy_rB = -4;
		}
	}
	if(x_gB == x_bB && y_gB == y_bB) {	
		if (EPressed || upArrPressed) {
			dy_gB = 0;
		}
	}
}
function draw() {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	blueBall();
	greenBall();
	redBall();
	leftHand();
	rightHand();
	bBMoveBounce();
	gBMoveBounce();
	rBMoveBounce();
	rHMoveBounce();
	lHMoveBounce();
	ballsCollide();
	rBGravity();
	gBGravity();
	bBGravity();
	threeInHand();
	pad(val);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.keyCode == 39) {
		rArrPressed = true;
	} else if (e.keyCode == 37) {
		lArrPressed = true;
	}
	if (e.keyCode == 68) {
		DPressed = true;
	} else if (e.keyCode == 65) {
		APressed = true;
	}
	if (e.keyCode == 38) {
		upArrPressed = true;
	} else if(e.keyCode == 69) {
		EPressed = true;
	}
}
function keyUpHandler(e) {

	if (e.keyCode == 39) {
		rArrPressed = false;
	} else if (e.keyCode == 37) {
		lArrPressed = false;
	}
	if (e.keyCode == 68) {
		DPressed = false;
	} else if (e.keyCode == 65) {
		APressed = false;
	}
	if(e.keyCode == 38) {
		upArrPressed = false;
	} else if(e.keyCode == 69) {
		EPressed = false;
	}
}

setInterval(draw,10)

</script>

</body>
</html>
