/**
 * Snake class, x and y is starting position.
 * 
 * @param {type} x Horizontal starting positon for snake.
 * @param {type} y Verical starting position for snake.
 * @param {type} worldW The Width of the world.
 * @param {type} worldH The Height of the world.
 * @returns {Snake}
 */
function Snake(x, y, worldW, worldH) {

    var speed = boxSize;
    var worldWidth = worldW;
    var worldHeight = worldH;
    // last will be the "head" of the snake.
    var last = {x: x, y: y};
    // The body of snake, at start put in "head".
    var body = new Array();
    body.push(last);

    var isAlive = true;
    var dir = {38: false, 40: false, 37: false, 39: false};
    var keys = {UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39};
    
    /**
     * Handles moving, and does checks to see if snake is still alive after move.
     */
    this.move = function () {

        if (dir[keys.UP]) {
            body.unshift({x: last.x, y: last.y - speed});
            last = body[0];

        } else if (dir[keys.DOWN]) {
            body.unshift({x: last.x, y: last.y + speed});
            last = body[0];

        } else if (dir[keys.LEFT]) {
            body.unshift({x: last.x - speed, y: last.y});
            last = body[0];

        } else if (dir[keys.RIGHT]) {
            body.unshift({x: last.x + speed, y: last.y});
            last = body[0];
        }
        // Removes tail.
        if (body.length > 1) {
            body.pop();
        }

        // If snake is out of bounds. kill it.
        if (last.x < 0 || (last.x + boxSize) > worldWidth || last.y < 0 || 
                (last.y + boxSize) > worldHeight) {
            isAlive = false;
        // If snake collided with body... kill it.    
        } else if (this.ranIntoItself()) {
            isAlive = false;
        }
    };
    
    /**
     * Method for handling input from user.
     * @param {type} e Input event
     * @returns {undefined|Snake.dir|Boolean}
     */
    this.doOnKeyDown = function (e) {
        var key = e.keyCode;
        
        // If P - then pause or unpause depending on state.
        if(key === 80 && !pause) {
            pause = true;
        } else if(key === 80 && pause) pause = false;
        
        // Do nothing if key is already down
        if (dir[key] || pause)
            return;

        // check what key is pressed and that the 
        // former key is not opposite direction
        if (key === keys.UP && !dir[keys.DOWN]) {
            dir[keys.DOWN] = false;
            dir[keys.LEFT] = false;
            dir[keys.RIGHT] = false;
            return dir[keys.UP] = true;
        } else if (key === keys.DOWN && !dir[keys.UP]) {
            dir[keys.UP] = false;
            dir[keys.LEFT] = false;
            dir[keys.RIGHT] = false;
            return dir[keys.DOWN] = true;
        } else if (key === keys.RIGHT && !dir[keys.LEFT]) {
            dir[keys.DOWN] = false;
            dir[keys.LEFT] = false;
            dir[keys.UP] = false;
            return dir[keys.RIGHT] = true;
        } else if (key === keys.LEFT && !dir[keys.RIGHT]) {
            dir[keys.DOWN] = false;
            dir[keys.RIGHT] = false;
            dir[keys.UP] = false;
            return dir[keys.LEFT] = true;
        }
    };
    /**
     * Expands size of snake with value
     * @param {int} value
     */
    this.grow = function (value) {
        for(var i = 0; i < value; i++)
            body.push(body[body.length - 1]);
    };
    
    /**
     * A getter for isAlive.
     * returns true if so, false if dead.
     * @returns {boolean}
     */
    this.isAlive = function () {
        return isAlive;
    };
    /**
     * Getter for "head" of snake. contains x and y position.
     * @returns {object} head of snake
     */
    this.head = function () {
        return last;
    };
    
    /**
     * Checks if the snake head has collided with body.
     * @returns {Boolean}
     */
    this.ranIntoItself = function () {
        if (body.length > 2) {
            for (var i = 2; i < body.length; i++) {
                if (last.x === body[i].x && last.y === body[i].y) {
                    return true;
                }
            }
        }
        return false;
    };

    /**
     * Draws snake on canvas.
     * @param {context} ctx
     */
    this.draw = function (ctx) {
        ctx.save();
        ctx.fillStyle = '#3998db';
        for (var i = 0, size = body.length; i < size; i++) {
      
                ctx.fillRect(body[i].x, body[i].y, boxSize, boxSize);
            
        }
        ctx.restore();
    };
    
    /**
     * Returns true if given position exists in snake body. Is used when 
     *     checking if fruit can spawn.
     * @param {int} otherX
     * @param {int} otherY
     * @returns {Boolean}
     */
    this.isAt = function (otherX, otherY) {
        size = body.length;
        for (var i = 0; i < size; i++) {
            if (otherX === body[i].x && otherY === body[i].y) {
                return true;
            }
        }
        return false;
    };
}

