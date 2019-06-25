const Snake = function (x, y, width, height) {
    const snake = {};

    snake.speed = 20;
    snake.width = width;
    snake.height = height;
    snake.headOfSnake = { x: x, y: y };
    snake.body = new Array();
    snake.body.push(snake.headOfSnake);
    snake.isAlive = true;
    snake.lastDirection = null;

    snake.move = function (direction) {
        if (snake.lastDirection === null) {
            snake.lastDirection = Object.assign({}, direction);
        }

        if (direction.UP && !snake.lastDirection.DOWN) {
            snake.moveVertical(-snake.speed);
            snake.lastDirection = Object.assign({}, direction);
        } else if (direction.DOWN && !snake.lastDirection.UP) {
            snake.moveVertical(snake.speed);
            snake.lastDirection = Object.assign({}, direction);
        } else if (direction.LEFT && !snake.lastDirection.RIGHT) {
            snake.moveHorizontal(-snake.speed);
            snake.lastDirection = Object.assign({}, direction);
        } else if (direction.RIGHT && !snake.lastDirection.LEFT) {
            snake.moveHorizontal(snake.speed);
            snake.lastDirection = Object.assign({}, direction);
        } else if (snake.lastDirection.UP) {
            snake.moveVertical(-snake.speed);
        } else if (snake.lastDirection.DOWN) {
            snake.moveVertical(snake.speed);
        } else if (snake.lastDirection.LEFT) {
            snake.moveHorizontal(-snake.speed);
        } else if (snake.lastDirection.RIGHT) {
            snake.moveHorizontal(snake.speed);
        }
        // Removes tail.
        if (snake.body.length > 1) {
            snake.body.pop();
        }

        if (snake.ranIntoItself()) {
            snake.isAlive = false;
        }
    };

    snake.moveVertical = function (speed) {
        snake.body.unshift({ x: snake.headOfSnake.x, y: snake.headOfSnake.y + speed });
        snake.headOfSnake = snake.body[0];
    }

    snake.moveHorizontal = function (speed) {
        snake.body.unshift({ x: snake.headOfSnake.x + speed, y: snake.headOfSnake.y });
        snake.headOfSnake = snake.body[0];
    }

    snake.outOfBounds = function (worldWidth, worldHeight) {
        return (snake.headOfSnake.x < 0 ||
            snake.headOfSnake.x + snake.width > worldWidth ||
            snake.headOfSnake.y < 0 ||
            snake.headOfSnake.y + snake.height > worldHeight);
    }

    snake.grow = function (value) {
        for (let i = 0; i < value; i++) {
            snake.body.push(snake.body[snake.body.length - 1]);
        }
    };

    snake.head = function () {
        return snake.headOfSnake;
    };

    snake.ranIntoItself = function () {
        if (snake.body.length > 2) {
            for (let i = 2; i < snake.body.length; i++) {
                if (snake.headOfSnake.x === snake.body[i].x
                    && snake.headOfSnake.y === snake.body[i].y) {
                    return true;
                }
            }
        }
        return false;
    };

    snake.isAt = function (otherX, otherY) {
        for (let i = 0, size = snake.body.length; i < size; i++) {
            if (otherX === snake.body[i].x && otherY === snake.body[i].y) {
                return true;
            }
        }
        return false;
    };

    return snake;
};