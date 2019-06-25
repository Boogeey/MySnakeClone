const GREENAPPLE = 1;
const REDAPPLE = 5;
const COLOR = {
    GREEN: '#2ecc71',
    RED: '#e74c3c'
}

const Fruit = function (size, x, y) {
    const fruit = {};
    fruit.type = (Math.floor(Math.random() * 10) < 7) ? GREENAPPLE : REDAPPLE;
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


    fruit.isAt = () => { return { x: fruit.x, y: fruit.y } };

    return fruit;
};