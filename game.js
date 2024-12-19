// Obtén los elementos del DOM
const canvas = document.getElementById("arkanoidCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score-display");
const startGameButton = document.getElementById("startGameButton");
const restartGameButton = document.getElementById("restartGameButton");

// Variables del juego
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;
let ballDX = 2;
let ballDY = -2;
const ballRadius = 10;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

const bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 }; // 1: visible, 0: broken
    }
}

let score = 0;
let gameInterval = null;
let isGameRunning = false;

// Dibuja la bola
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Dibuja la plataforma
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Dibuja los ladrillos
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status === 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// Actualiza la puntuación
function drawScore() {
    scoreDisplay.textContent = `Puntuación: ${score}`;
}

// Detecta colisiones
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
                if (
                    ballX > b.x &&
                    ballX < b.x + brickWidth &&
                    ballY > b.y &&
                    ballY < b.y + brickHeight
                ) {
                    ballDY = -ballDY;
                    b.status = 0;
                    score++;
                    if (score === brickRowCount * brickColumnCount) {
                        endGame("¡Felicidades! Has ganado.");
                    }
                }
            }
        }
    }
}

// Movimiento de la bola
function moveBall() {
    ballX += ballDX;
    ballY += ballDY;

    if (ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
        ballDX = -ballDX;
    }
    if (ballY + ballDY < ballRadius) {
        ballDY = -ballDY;
    } else if (ballY + ballDY > canvas.height - ballRadius) {
        if (ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballDY = -ballDY;
        } else {
            endGame("¡Fin del juego! Has perdido.");
        }
    }
}

// Finaliza el juego
function endGame(message) {
    clearInterval(gameInterval);
    isGameRunning = false;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "24px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.textAlign = "center";
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);

    restartGameButton.style.display = "block";
    startGameButton.style.display = "none";
}

// Reinicia el juego
function resetGame() {
    ballX = canvas.width / 2;
    ballY = canvas.height - 30;
    ballDX = 2;
    ballDY = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
    score = 0;

    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r].status = 1;
        }
    }

    drawScore();
}

// Inicia el juego
function startGame() {
    if (!isGameRunning) {
        resetGame();
        gameInterval = setInterval(draw, 10);
        isGameRunning = true;
        startGameButton.style.display = "none";
        restartGameButton.style.display = "block";
    }
}

// Reinicia el juego
function restartGame() {
    if (isGameRunning) {
        clearInterval(gameInterval);
    }
    resetGame();
    gameInterval = setInterval(draw, 10);
    isGameRunning = true;
}

// Maneja el movimiento del paddle
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    paddleX = Math.max(0, Math.min(mouseX - paddleWidth / 2, canvas.width - paddleWidth));
});

canvas.addEventListener("touchmove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const touchX = e.touches[0].clientX - rect.left;
    paddleX = Math.max(0, Math.min(touchX - paddleWidth / 2, canvas.width - paddleWidth));
});

// Maneja los eventos de los botones
startGameButton.addEventListener("click", startGame);
restartGameButton.addEventListener("click", restartGame);

// Dibuja todo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();
    moveBall();
}
