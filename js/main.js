let canvas = null;
let context = null;
let snake = null;
let fruit = null;
let input = null;
let animationFrameRequest = null;
let frame = 0;
let score = null;
let lastscore = null;
let topscore = 0;
const boxSize = 20;
const scoreLabel = document.getElementById('score');
const topScoreLabel = document.getElementById('topscore');

function main() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext("2d");

    initialize();
}

function initialize() {
    score = 0;
    snake = Snake(canvas.width / 2 - boxSize, canvas.height / 2 - boxSize, boxSize, boxSize);
    input = new Input();
    fruit = createFruit();
    window.addEventListener("keydown", function (e) {
        input.handleKeyPress(e);
    });

    animationFrameRequest = requestAnimationFrame(run);
}

function createFruit() {
    let x = Math.floor(Math.random() * canvas.width / boxSize) * boxSize;
    let y = Math.floor(Math.random() * canvas.height / boxSize) * boxSize;
    if (snake.isAt(x, y)) {
        return createFruit();
    }
    return Fruit(boxSize, x, y);
}

function reset() {
    cancelAnimationFrame(animationFrameRequest);
}

function run() {
    if (frame % 3 === 0) {
        update();
        render();
    }
    frame++;
    if (frame > 10000) {
        frame = 0;
    }
    cancelAnimationFrame(animationFrameRequest);
    animationFrameRequest = requestAnimationFrame(run);
}

function update() {
    if (!snake.isAlive || snake.outOfBounds(canvas.width, canvas.height)) {
        gameOver();
        return;
    }

    snake.move(input.getDirection());

    if (fruit.isEaten(snake.head())) {
        score += fruit.type;
        snake.grow(fruit.type);
        fruit = createFruit();
    }
}

function gameOver() {
    if (score > topscore) {
        topscore = score;
        topScoreLabel.innerText = topscore;
    }
    reset();
    initialize();
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    drawRect(fruit.x, fruit.y, fruit.width, fruit.height, fruit.color);
    drawSnake();

    // if score has changed.
    if (lastscore !== score) {
        scoreLabel.innerText = score;
        lastscore = score;
    }
}

function drawRect(x, y, w, h, color) {
    context.save();
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
    context.restore();
}

function drawSnake() {
    context.save();
    context.fillStyle = '#3998db';
    for (let i = 0, size = snake.body.length; i < size; i++) {
        context.fillRect(snake.body[i].x, snake.body[i].y, snake.width, snake.height);
    }
    context.restore();
}

document.addEventListener("DOMContentLoaded", function (event) {
    main();
});