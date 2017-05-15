var canvas;
var ctx;
var stroked = true;
var filled = true;

function initializeCanvas(w, h) {
	canvas = document.createElement("canvas");
	canvas.id = "canvas";
	canvas.width = w;
	canvas.height = h;
	backgroundColor("black");

	ctx = canvas.getContext("2d");
	document.body.appendChild(canvas);
}

// Random number
function random(from, to) {
	return ((Math.random() * to) + from);
}

// Vector object
function Vector2(x, y) {
	this.x = x;
	this.y = y;
}

// Set canvas color
function backgroundColor(color) {
	canvas.style.background = color;
}

// Clear the canvas
function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Turn on stroke
function strokeOn() {
	stroked = true;
}

// Turn off stroke
function strokeOff() {
	stroked = false;
}

// Set stroke style
function stroke(color) {
	ctx.strokeStyle = color;
}

// Turn on filling
function fillOn() {
	filled = true;
}

// Turn off filling
function fillOff() {
	filled = false;
}

// Set filling style
function fill(color) {
	ctx.fillStyle = color;
}

// Draw a rectangle
function rectangle(x, y, w, h) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	if (filled) ctx.fill();
	if (stroked) ctx.stroke();
	ctx.closePath();
}

// Draw an ellipse
function ellipse(x, y, r) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	if (filled) ctx.fill();
	if (stroked) ctx.stroke();
	ctx.closePath();
}

// Draw a line
function line(x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.stroke();
	ctx.closePath();
}
