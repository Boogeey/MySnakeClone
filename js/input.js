const keys = { UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39 };

function Input() {
    this.direction = { UP: false, DOWN: false, LEFT: false, RIGHT: false };

    this.handleKeyPress = (e) => {
        let keyPressed = e.keyCode;

        if (keys.UP === keyPressed && !this.direction.DOWN) {
            this.resetKeyPress();
            this.direction.UP = true;
            return;
        }
        if (keys.DOWN === keyPressed && !this.direction.UP) {
            this.resetKeyPress();
            this.direction.DOWN = true;
            return;
        }
        if (keys.LEFT === keyPressed && !this.direction.RIGHT) {
            this.resetKeyPress();
            this.direction.LEFT = true;
            return;
        }
        if (keys.RIGHT === keyPressed && !this.direction.LEFT) {
            this.resetKeyPress();
            this.direction.RIGHT = true;
            return;
        }

    };

    this.resetKeyPress = () => {
        this.direction.UP = false;
        this.direction.DOWN = false;
        this.direction.LEFT = false;
        this.direction.RIGHT = false;
    };

    this.getDirection = () => {
        return this.direction;
    }
}