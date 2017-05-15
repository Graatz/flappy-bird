var bird;
var walls = [];
var points = 0;
var paused = false;

var Ball = function() {
	this.position = new Vector2(canvas.width * 0.5, canvas.height * 0.5);
	this.gravity = 0.5;
	this.velocity = 0;
	this.size = 10;
}

Ball.prototype.update = function() {
	this.velocity += this.gravity;
	this.position.y += this.velocity
	if (this.position.y > canvas.height)
		this.position.y = canvas.height - this.size;

	if (this.velocity < 0)
		this.velocity += 1;

	for (var i = 0;  i < walls.length; i++) {
		if (this.collides(walls[i]))
			paused = true;
	}
}

Ball.prototype.draw = function() {
	if (paused == false) {
		clear();
		this.update();
		ellipse(this.position.x, this.position.y, this.size);
	}
	requestAnimationFrame(this.draw.bind(this));
}

Ball.prototype.collides = function(object) {
	if ((this.position.x - this.size) < object.position.x + object.width &&
			(this.position.x + this.size) > object.position.x &&
			(this.position.y - this.size) < object.position.y + object.height &&
			(this.position.y + this.size) > object.position.y)
		return true;
}

Ball.prototype.jump = function() {
	ball.velocity = -(this.gravity * 30);
}

var Wall = function(position, height) {
	this.position = position;
	this.width = 50;
	this.height = height;
	this.assigned = false;
}

Wall.prototype.update = function() {
	this.position.x -= 3;
}

Wall.prototype.draw = function() {
	if (paused == false) this.update();
	rectangle(this.position.x, this.position.y, this.width, this.height);
}

function setup() {
	initializeCanvas(800, 900);
	backgroundColor("black"); fillOn(); strokeOff(); fill("white");
	ctx.font = "30px Calibri";
	ctx.textAlign = "center";
	canvas.addEventListener("mousedown", mouseDown);

	ball = new Ball();

	setInterval(spawnWall, 1500);
	draw();
}

function draw() {
	ball.draw();
	drawWalls();
}

function mouseDown() {
	ball.jump();
	if (paused === true)
		restart();
}

function restart() {
	ball.position.y = canvas.height / 2;
	points = 0;
	paused = false;
	walls = [];
}

function checkPoints() {
	for (var i = 1;  i < walls.length - 1; i+=2) {
		if ((ball.position.x > (walls[i].position.x + walls[i].width)) &&
				walls[i].assigned === false) {
			walls[i].assigned = true;
			walls[i-1].assigned = true;
			points += 1;
		}
	}

	ctx.fillText(points, canvas.width / 2, canvas.height / 8);
}

function spawnWall() {
	var wallHeight = random(canvas.height / 8, canvas.height / 2);
	var initialPosition = new Vector2(canvas.width, 0);
	var wall = new Wall(initialPosition, wallHeight);

	var wallHeight2 = canvas.height - wallHeight - random(110, 150);
	var initialPosition2 = new Vector2(canvas.width, canvas.height - wallHeight2);
	var wall2 = new Wall(initialPosition2, wallHeight2);

	walls[walls.length] = wall;
	walls[walls.length] = wall2;
}

function drawWalls() {
	for (var i = 0; i < walls.length; i++) {
		walls[i].draw();
	}

	if (walls.length > 0) {
		if (walls[0].position.x < 0 - walls[0].width)
			walls.splice(0, 1);
	}

	checkPoints();
	requestAnimationFrame(drawWalls);
}
