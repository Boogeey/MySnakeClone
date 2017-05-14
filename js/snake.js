function Snake(x, y, worldW, worldH) {

    var speed = boxSize;
    var worldWidth = worldW;
    var worldHeight = worldH;
    var headOfSnake = {x: x, y: y};
    var body = new Array();
    body.push(headOfSnake);

    var isAlive = true;
    var dir = {38: false, 40: false, 37: false, 39: false};
    var keys = {UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39};
    
    this.move = function () {
        if (dir[keys.UP]) {
            body.unshift({x: headOfSnake.x, y: headOfSnake.y - speed});
            headOfSnake = body[0];

        } else if (dir[keys.DOWN]) {
            body.unshift({x: headOfSnake.x, y: headOfSnake.y + speed});
            headOfSnake = body[0];

        } else if (dir[keys.LEFT]) {
            body.unshift({x: headOfSnake.x - speed, y: headOfSnake.y});
            headOfSnake = body[0];

        } else if (dir[keys.RIGHT]) {
            body.unshift({x: headOfSnake.x + speed, y: headOfSnake.y});
            headOfSnake = body[0];
        }
        // Removes tail.
        if (body.length > 1) {
            body.pop();
        }

        // If snake is out of bounds. kill it.
        if (headOfSnake.x < 0 || (headOfSnake.x + boxSize) > worldWidth || headOfSnake.y < 0 || 
                (headOfSnake.y + boxSize) > worldHeight) {
            isAlive = false;
        // If snake collided with body... kill it.    
        } else if (this.ranIntoItself()) {
            isAlive = false;
        }
    };
    
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
    
    this.grow = function (value) {
        for(var i = 0; i < value; i++)
            body.push(body[body.length - 1]);
    };
    
    this.isAlive = function () {
        return isAlive;
    };
    
    this.head = function () {
        return headOfSnake;
    };
    
    this.ranIntoItself = function () {
        if (body.length > 2) {
            for (var i = 2; i < body.length; i++) {
                if (headOfSnake.x === body[i].x && headOfSnake.y === body[i].y) {
                    return true;
                }
            }
        }
        return false;
    };

    this.draw = function (ctx) {
        ctx.save();
        ctx.fillStyle = '#3998db';
        for (var i = 0, size = body.length; i < size; i++) {
                ctx.fillRect(body[i].x, body[i].y, boxSize, boxSize);         
        }
        ctx.restore();
    };
    
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
