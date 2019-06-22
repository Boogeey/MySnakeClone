var canvas = null, ctx = null,
    width = 20, height = 20;
var boxSize = 20;
var snake = null;
var frames = 0;
var score = null;
var lastscore = null;
var refreshIntervalId = null;

var pause = false;
var topscore = 0;

// Take control over a few elements.
var scoreLabel = $('#score');
var pauseLabel = $('#pause');
var topScoreLabel = $('#topscore');

// Fruit types, value is with how much snake will grow.
var GREENAPPLE = 1;
var REDAPPLE = 5;

// Always start with green apple, yum!
var type = GREENAPPLE;

// Fruit object
var fruit = {
    x: null,
    y: null,
    init: function () {
        type = GREENAPPLE;
        this.x = Math.floor(Math.random() * canvas.width / boxSize) * boxSize;
        this.y = Math.floor(Math.random() * canvas.height / boxSize) * boxSize;
    },
    isAt: function () {
        return { x: this.x, y: this.y };
    },
    isEaten: function (head) {
        var iseaten = !(head.x !== this.x || head.y !== this.y);

        return iseaten;
    },
    createFruit: function () {
        // Randomize number to get next apple type.
        type = (Math.floor(Math.random() * 10) < 7) ? GREENAPPLE : REDAPPLE;

        this.x = Math.floor(Math.random() * canvas.width / boxSize) * boxSize;
        this.y = Math.floor(Math.random() * canvas.height / boxSize) * boxSize;
        if (snake.isAt(this.x, this.y)) {
            this.createFruit();
        }
        else
            return;
    },
    draw: function (ctx) {
        ctx.save();

        if (type === GREENAPPLE)
            ctx.fillStyle = '#2ecc71';
        else
            ctx.fillStyle = '#e74c3c';

        roundRect(ctx, this.x, this.y, boxSize, boxSize, 4, true, false);

        ctx.restore();
    }
};

/**
 * Sets up canvas in div called container. calls init().
 */
function main() {

    canvas = document.createElement("canvas");
    canvas.setAttribute('width', width * boxSize);
    canvas.setAttribute('height', height * boxSize);
    ctx = canvas.getContext("2d");

    div = document.getElementById('container');
    div.appendChild(canvas);
    init();
}

/**
 * Sets up the game and starts it.
 */
function init() {
    score = 0;
    snake = new Snake(canvas.width / 2 - boxSize, canvas.height / 2 - boxSize, canvas.width, canvas.height);
    fruit.init();
    window.addEventListener("keydown", function (e) {
        snake.doOnKeyDown(e);
    });

    // Check if interval is started, if so clear it.
    if (refreshIntervalId !== null)
        clearInterval(refreshIntervalId);

    refreshIntervalId = setInterval(run, 1000 / 60);
}

/**
 * Runs the game, updates every fourth frame.
 * Render each frame.
 */
function run() {
    if (!pause) {
        if (frames % 4 === 0)
            update();

        render();
        frames++;
        if (frames > 10000)
            frames = 0;
    }

}

/**
 * Handles all the updates of game logic.
 */
function update() {
    if (snake.isAlive()) {
        snake.move();
        if (fruit.isEaten(snake.head())) {

            score += type;
            snake.grow(type);
            fruit.createFruit();

        }
        return;
    } else {
        // Game over.
        if (score > topscore) {
            topscore = score;
            topScoreLabel.text(function () {
                topScoreLabel.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                    topScoreLabel.css('font-size', '1.2em');
                });

                topScoreLabel.css('font-size', '1.4em');
                topScoreLabel.text(topscore);

            });
        }
        init();

    }
}

/*
 * Renders the canvas.
 * calls snake and fruit draw methods for their drawing on canvas.
 */
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);



    // draw fruit
    fruit.draw(ctx);

    // draw snake
    snake.draw(ctx);

    // draw score using jquery for fun.
    // if score has changed.
    if (lastscore !== score) {
        scoreLabel.text(function () {
            scoreLabel.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                scoreLabel.css('font-size', '1.2em');
            });

            scoreLabel.css('font-size', '1.4em');
            scoreLabel.text(score);
            lastscore = score;
        });
    }
    if (pause)
        pauseLabel.text("P to unpause");
    else
        pauseLabel.text("P to pause");
}


/**
 * TAKEN FROM: http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
 * 
 * Draws a rounded rectangle using the current state of the canvas. 
 * If you omit the last three params, it will draw a rectangle 
 * outline with a 5 pixel border radius 
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate 
 * @param {Number} width The width of the rectangle 
 * @param {Number} height The height of the rectangle
 * @param {Number} radius The corner radius. Defaults to 5;
 * @param {Boolean} fill Whether to fill the rectangle. Defaults to false.
 * @param {Boolean} stroke Whether to stroke the rectangle. Defaults to true.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === "undefined") {
        stroke = true;
    }
    if (typeof radius === "undefined") {
        radius = 5;
    }
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (stroke) {
        ctx.stroke();
    }
    if (fill) {
        ctx.fill();
    }
}

$(document).ready(function () {

    // Starts the game.
    main();
});