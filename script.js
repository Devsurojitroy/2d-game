const player = document.getElementById('player');
const fallingObjects = document.querySelectorAll('.falling-object');
const scoreDisplay = document.getElementById('score');
const gameArea = document.getElementById('gameArea');

let playerLeft = gameArea.clientWidth / 2 - player.clientWidth / 2;
let score = 0;
const playerSpeed = 10;
const fallingSpeed = 5;

function movePlayer(event) {
    if (event.key === 'ArrowLeft') {
        playerLeft = Math.max(0, playerLeft - playerSpeed);
    } else if (event.key === 'ArrowRight') {
        playerLeft = Math.min(gameArea.clientWidth - player.clientWidth, playerLeft + playerSpeed);
    }
    player.style.left = playerLeft + 'px';
}

function updateFallingObjects() {
    fallingObjects.forEach(object => {
        let objectTop = parseInt(window.getComputedStyle(object).top) || -30;
        objectTop += fallingSpeed;
        if (objectTop > gameArea.clientHeight) {
            objectTop = -30;
            object.style.left = Math.random() * (gameArea.clientWidth - object.clientWidth) + 'px';
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
        object.style.top = objectTop + 'px';

        // Check for collision
        const playerRect = player.getBoundingClientRect();
        const objectRect = object.getBoundingClientRect();
        if (
            playerRect.left < objectRect.left + objectRect.width &&
            playerRect.left + playerRect.width > objectRect.left &&
            playerRect.top < objectRect.top + objectRect.height &&
            playerRect.top + playerRect.height > objectRect.top
        ) {
            alert(`Game Over! Your score is ${score}`);
            score = 0;
            scoreDisplay.textContent = `Score: ${score}`;
            fallingObjects.forEach(obj => obj.style.top = '-30px'); // Reset positions
        }
    });
}

document.addEventListener('keydown', movePlayer);
setInterval(updateFallingObjects, 20);