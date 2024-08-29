const player = document.getElementById('player');
const fallingObject = document.querySelector('.falling-object');
const scoreDisplay = document.getElementById('score');
const leftBtn = document.getElementById('leftBtn');
const rightBtn = document.getElementById('rightBtn');
const gameArea = document.getElementById('gameArea');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScore = document.getElementById('finalScore');
const restartBtn = document.getElementById('restartBtn');

let playerLeft = gameArea.clientWidth / 2 - player.clientWidth / 2;
const playerSpeed = 10;
let fallingSpeed = 4;
let score = 0;

function startGame() {
    fallingObject.style.top = '-40px';
    fallingObject.style.left = Math.random() * (gameArea.clientWidth - fallingObject.clientWidth) + 'px';
    score = 0;
    updateScore();
    gameOverScreen.style.display = 'none';
    requestAnimationFrame(gameLoop);
}

function movePlayer(direction) {
    if (direction === 'left') {
        playerLeft = Math.max(0, playerLeft - playerSpeed);
    } else if (direction === 'right') {
        playerLeft = Math.min(gameArea.clientWidth - player.clientWidth, playerLeft + playerSpeed);
    }
    player.style.left = playerLeft + 'px';
}

function updateFallingObject() {
    let objectTop = parseFloat(window.getComputedStyle(fallingObject).top);
    objectTop += fallingSpeed;
    if (objectTop > gameArea.clientHeight) {
        objectTop = -40;
        fallingObject.style.left = Math.random() * (gameArea.clientWidth - fallingObject.clientWidth) + 'px';
        score += 10;
        updateScore();
    }
    fallingObject.style.top = objectTop + 'px';

    if (objectTop + fallingObject.clientHeight > gameArea.clientHeight - player.clientHeight &&
        parseFloat(window.getComputedStyle(fallingObject).left) + fallingObject.clientWidth > playerLeft &&
        parseFloat(window.getComputedStyle(fallingObject).left) < playerLeft + player.clientWidth) {
        endGame();
    }
}

function updateScore() {
    scoreDisplay.textContent = 'Score: ' + score;
}

function endGame() {
    gameOverScreen.style.display = 'block';
    finalScore.textContent = 'Final Score: ' + score;
}

function restartGame() {
    startGame();
}

function gameLoop() {
    updateFallingObject();
    requestAnimationFrame(gameLoop);
}

leftBtn.addEventListener('click', () => movePlayer('left'));
rightBtn.addEventListener('click', () => movePlayer('right'));

restartBtn.addEventListener('click', restartGame);

startGame();