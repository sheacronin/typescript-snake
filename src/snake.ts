import { CANVAS_WIDTH_HEIGHT, SINGLE_GRID_SIZE, context } from './canvas';

type Direction = {
    right: 'ArrowRight';
    left: 'ArrowLeft';
    down: 'ArrowUp';
    up: 'ArrowDown';
};

const snake = {
    x: CANVAS_WIDTH_HEIGHT / 2 - SINGLE_GRID_SIZE,
    y: CANVAS_WIDTH_HEIGHT / 2 - SINGLE_GRID_SIZE,
    length: 1,
    initialize() {
        context.fillRect(snake.x, snake.y, SINGLE_GRID_SIZE, SINGLE_GRID_SIZE);
    },
    move(direction: Direction[keyof Direction]) {
        clearTimeout(this.movingTimeoutId);

        context.clearRect(
            snake.x,
            snake.y,
            snake.x + SINGLE_GRID_SIZE,
            snake.y + SINGLE_GRID_SIZE
        );

        switch (direction) {
            case 'ArrowRight':
                snake.x += SINGLE_GRID_SIZE;
                break;
            case 'ArrowLeft':
                snake.x -= SINGLE_GRID_SIZE;
                break;
            case 'ArrowUp':
                snake.y -= SINGLE_GRID_SIZE;
                break;
            case 'ArrowDown':
                snake.y += SINGLE_GRID_SIZE;
                break;
        }

        context.fillRect(snake.x, snake.y, SINGLE_GRID_SIZE, SINGLE_GRID_SIZE);

        const shouldDie = this._checkIfHitWall();
        if (shouldDie) {
            return this.die();
        }

        this.movingTimeoutId = setTimeout(() => this.move(direction), 100);
    },
    die() {
        clearTimeout(this.movingTimeoutId);
        console.log('YOU DIED');
    },
    _checkIfHitWall() {
        if (
            snake.x < 0 ||
            snake.y < 0 ||
            snake.x > CANVAS_WIDTH_HEIGHT - SINGLE_GRID_SIZE ||
            snake.y > CANVAS_WIDTH_HEIGHT - SINGLE_GRID_SIZE
        ) {
            return true;
        } else {
            return false;
        }
    },
};

document.addEventListener('keydown', (e) => {
    if (
        e.key === 'ArrowUp' ||
        e.key === 'ArrowDown' ||
        e.key === 'ArrowRight' ||
        e.key === 'ArrowLeft'
    ) {
        snake.move(e.key);
    }
});

export default snake;
