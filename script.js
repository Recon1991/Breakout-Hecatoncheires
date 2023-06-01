// Get the canvas element
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Ball variables
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballRadius = 10;
let ballDX = 2;
let ballDY = -2;

// Paddle variables
let paddleWidth = 75;
let paddleHeight = 10;
let paddleX = (canvas.width - paddleWidth) / 2;

// Brick variables
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

// Game variables
let score = 0;
let lives = 3;
let level = 1;

function draw() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
  
	// Draw the ball
	ctx.beginPath();
	ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
  
	// Draw the paddle
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
  
	// Draw the bricks
	for (let row = 0; row < brickRowCount; row++) {
	  for (let col = 0; col < brickColumnCount; col++) {
		let brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
		let brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
		ctx.beginPath();
		ctx.rect(brickX, brickY, brickWidth, brickHeight);
		ctx.fillStyle = "#0095DD";
		ctx.fill();
		ctx.closePath();
	  }
	}
  }

  function update() {
	// Move the ball
	ballX += ballDX;
	ballY += ballDY;
  
	// Bounce the ball off the walls
	if (ballX + ballRadius > canvas.width || ballX - ballRadius < 0) {
	  ballDX = -ballDX;
	}
	if (ballY - ballRadius < 0) {
	  ballDY = -ballDY;
	}
  
	// Check for collision with the paddle
	if (
	  ballY + ballDY > canvas.height - paddleHeight &&
	  ballX + ballRadius > paddleX &&
	  ballX - ballRadius < paddleX + paddleWidth
	) {
	  ballDY = -ballDY;
	}
  
	// Check for collision with bricks
  
	// Move the paddle
  
	// Update the score and lives
  
	// Call the draw function to redraw the game elements
	draw();
  }

  document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event) {
	if (event.key === "ArrowRight") {
	  paddleX += 7; // Move the paddle right by 7 pixels
	} else if (event.key === "ArrowLeft") {
	  paddleX -= 7; // Move the paddle left by 7 pixels
	}
}

function keyUpHandler(event) {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    // Stop moving the paddle
  }
}

function gameLoop() {
	update();
	draw();
	requestAnimationFrame(gameLoop);
  }
  
  // Start the game loop
  gameLoop();
  