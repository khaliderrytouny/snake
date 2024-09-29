const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scale = 20;  // Size of each cell
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [{ x: 2 * scale, y: 2 * scale }];
let food = { x: 4 * scale, y: 4 * scale };
let dx = scale;
let dy = 0;
let score = 0;
let message = '';
let gameOver = false; // Flag to indicate game over

document.addEventListener('keydown', changeDirection);

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, scale, scale);
    
    // Draw snake
    ctx.fillStyle = 'green';
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, scale, scale);
    }
    
    // Draw score and message
    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('message').innerText = message;
}

function update() {
    if (gameOver) return; // Stop updates if the game is over

    const head = { ...snake[0] };

    head.x += dx;
    head.y += dy;

    // Wrap around canvas when snake hits the walls
    if (head.x < 0) {
        head.x = canvas.width - scale;
    } else if (head.x >= canvas.width) {
        head.x = 0;
    }

    if (head.y < 0) {
        head.y = canvas.height - scale;
    } else if (head.y >= canvas.height) {
        head.y = 0;
    }

    // Check for collision with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        if (score === 5) {
            message = 'I love you olaya 🎀❤';
            gameOver = true; // End the game when the score reaches 5
        }
        placeFood();
    } else {
        snake.pop(); // Remove last segment if not eating
    }

    snake.unshift(head);

    // Commented out self-collision check to prevent game over
    // if (collision(head)) {
    //     resetGame();
    // }
}

function collision(head) {
    for (let segment of snake.slice(1)) {
        if (head.x === segment.x && head.y === segment.y) {
            return true;
        }
    }
    return false;
}

function placeFood() {
    let validPosition = false;

    while (!validPosition) {
        food.x = Math.floor(Math.random() * columns) * scale;
        food.y = Math.floor(Math.random() * rows) * scale;

        // Ensure food is not placed on the snake
        validPosition = !snake.some(segment => segment.x === food.x && segment.y === food.y);
    }
}

function changeDirection(event) {
    if (gameOver) return; // Ignore input if the game is over

    const { keyCode } = event;

    if (keyCode === 37 && dx === 0) { // Left
        dx = -scale;
        dy = 0;
    } else if (keyCode === 38 && dy === 0) { // Up
        dx = 0;
        dy = -scale;
    } else if (keyCode === 39 && dx === 0) { // Right
        dx = scale;
        dy = 0;
    } else if (keyCode === 40 && dy === 0) { // Down
        dx = 0;
        dy = scale;
    }
}

function resetGame() {
    snake = [{ x: 2 * scale, y: 2 * scale }];
    dx = scale;
    dy = 0;
    score = 0;
    message = '';
    gameOver = false; // Reset game over flag
    placeFood();
}

function gameLoop() {
    draw();
    update();
}

placeFood();
setInterval(gameLoop, 100);

// Mobile Button Controls
document.getElementById('upBtn').addEventListener('click', () => {
    if (dy === 0 && !gameOver) {
        dx = 0;
        dy = -scale;
    }
});
document.getElementById('downBtn').addEventListener('click', () => {
    if (dy === 0 && !gameOver) {
        dx = 0;
        dy = scale;
    }
});
document.getElementById('leftBtn').addEventListener('click', () => {
    if (dx === 0 && !gameOver) {
        dx = -scale;
        dy = 0;
    }
});
document.getElementById('rightBtn').addEventListener('click', () => {
    if (dx === 0 && !gameOver) {
        dx = scale;
        dy = 0;
    }
});
