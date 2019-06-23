let canvas = null;
let ctx = null;
let snake = null;
let fruit = null;
let input = null;
let animationFrameRequest = null;
let frame = 0;
let score = null;
let lastscore = null;
let refreshIntervalId = null;
let pause = false;
let topscore = 0;
const boxSize = 20;
const scoreLabel = document.getElementById('score');
const topScoreLabel = document.getElementById('topscore');

function main() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");

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
    appleType = (Math.floor(Math.random() * 10) < 7) ? GREENAPPLE : REDAPPLE;

    let x = Math.floor(Math.random() * canvas.width / boxSize) * boxSize;
    let y = Math.floor(Math.random() * canvas.height / boxSize) * boxSize;
    if (snake.isAt(x, y)) {
        return createFruit();
    }
    return Fruit(appleType, boxSize, x, y);
}

function reset() {
    cancelAnimationFrame(animationFrameRequest);
}

function run() {
    update();
    render();

    cancelAnimationFrame(animationFrameRequest);
    animationFrameRequest = requestAnimationFrame(run);
}

function update() {
    if (!snake.isAlive) {
        gameOver();
        return;
    }

    snake.move(input.getDirection());
    if (snake.outOfBounds(canvas.width, canvas.height)) {
        gameOver();
        return;
    }

    if (fruit.isEaten(snake.head())) {
        score += appleType;
        snake.grow(appleType);
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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fruit.draw(ctx);
    snake.draw(ctx);

    // if score has changed.
    if (lastscore !== score) {
        scoreLabel.innerText = score;
        lastscore = score;
    }
}

function drawRect(x, y, w, h, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
}

document.addEventListener("DOMContentLoaded", function (event) {
    main();
});