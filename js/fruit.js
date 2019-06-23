const GREENAPPLE = 3;
const REDAPPLE = 10;
const COLOR = {
    GREEN: '#2ecc71',
    RED: '#e74c3c'
}

const Fruit = function (type, size, x, y) {
    const fruit = {};
    fruit.type = type;
    fruit.x = x;
    fruit.y = y;
    fruit.width = size;
    fruit.height = size;
    fruit.color = fruit.type === GREENAPPLE ? COLOR.GREEN : COLOR.RED;

    fruit.isEaten = function (head) {
        if (fruit.x < head.x + boxSize &&
            fruit.x + fruit.width > head.x &&
            fruit.y < head.y + boxSize &&
            fruit.y + fruit.height > head.y) {
            return true;
        }
        return false;
    }

    fruit.draw = function (ctx) {
        drawRect(fruit.x, fruit.y, fruit.width, fruit.height, fruit.color);
    }

    fruit.isAt = () => { return { x: fruit.x, y: fruit.y } };

    return fruit;
};