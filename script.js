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
let paddleXVelocity = 0; 

// Brick variables
let brickRowCount = 5;
let brickColumnCount = 10;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

// Create an empty array to store the bricks
let bricks = [];

// Game variables
let score = 0;
let lives = 3;
let level = 1;

function draw() {
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Set the canvas size to match the window dimensions
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
  
	// Draw the ball
	ctx.beginPath();
	ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
	ctx.fillStyle = "#ce60cf";
	ctx.fill();
	ctx.closePath();
  
	// Draw the paddle
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
  
	// Draw the score
  	ctx.font = "16px Arial";
  	ctx.fillStyle = "#dee515";
  	ctx.fillText("Score: " + score, 8, 15);

  	// Draw the lives
  	ctx.fillText("Lives: " + lives, canvas.width - 80, 15);

	// Draw the bricks
	drawBricks();
}

function drawBricks() {
	for (let row = 0; row < brickRowCount; row++) {
	  for (let col = 0; col < brickColumnCount; col++) {
		if (bricks[row][col].status === 1) {
		  let brickX = col * (brickWidth + brickPadding) + brickOffsetLeft;
		  let brickY = row * (brickHeight + brickPadding) + brickOffsetTop;
		  bricks[row][col].x = brickX;
		  bricks[row][col].y = brickY;
		  ctx.beginPath();
		  ctx.rect(brickX, brickY, brickWidth, brickHeight);
		  ctx.fillStyle = "#15dee5";
		  ctx.fill();
		  ctx.closePath();
		}
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
  
	// Check for collision with the bottom wall
	if (ballY + ballRadius > canvas.height) {
		lives--; // Subtract a life

		if (lives === 0) {
		  
			// uh oh you ded

		} else {
		  // Reset the ball position to the starting point
		  ballX = canvas.width / 2;
		  ballY = canvas.height - 30;

		  paddleX = (canvas.width - paddleWidth) / 2;
		}
	}

	// Update paddleX
	paddleX += paddleXVelocity;
  
	// Keep the paddle within the canvas bounds
	if (paddleX < 0) {
	  paddleX = 0;
	} else if (paddleX + paddleWidth > canvas.width) {
	  paddleX = canvas.width - paddleWidth;
	}

	// Initialize the bricks array with values
	for (let row = 0; row < brickRowCount; row++) {
  		bricks[row] = [];
  		for (let col = 0; col < brickColumnCount; col++) {
    		bricks[row][col] = { x: 0, y: 0, status: 1 };
 		 }
	}

	// Check for collisions with bricks
	for (let row = 0; row < brickRowCount; row++) {
		for (let col = 0; col < brickColumnCount; col++) {
		  let brick = bricks[row][col];
		  if (brick.status === 1) {
			if (
			  ballX + ballRadius > brick.x &&
			  ballX - ballRadius < brick.x + brickWidth &&
			  ballY + ballRadius > brick.y &&
			  ballY - ballRadius < brick.y + brickHeight
			) {
			  ballDY = -ballDY;
			  brick.status = 0; // Mark the brick as collided (remove it)
			  score++; // Increment the score
			}
		  }
		}
	  }
  
	// Call the draw function to redraw the game elements
	draw();

}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(event) {
	if (event.key === "ArrowRight") {
	  paddleXVelocity = 7; // Set the paddle's horizontal velocity to a positive value (e.g., moving right)
	} else if (event.key === "ArrowLeft") {
	  paddleXVelocity = -7; // Set the paddle's horizontal velocity to a negative value (e.g., moving left)
	}
}
  
function keyUpHandler(event) {
	if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
	  paddleXVelocity = 0; // Set the paddle's horizontal velocity to zero (stop the movement)
	}
}

function gameLoop() {
	for (let row = 0; row < brickRowCount; row++) {
		bricks[row] = [];
		for (let col = 0; col < brickColumnCount; col++) {
		  bricks[row][col] = { x: 0, y: 0, status: 1 };
		}
	  }
	update();
	draw();
	requestAnimationFrame(gameLoop);
}
  
// Start the game loop
gameLoop();
  