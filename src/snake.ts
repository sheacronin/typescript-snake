import { CANVAS_WIDTH_HEIGHT, SINGLE_GRID_SIZE, context } from './canvas';
import Food from './food';

type Direction = {
    right: 'ArrowRight';
    left: 'ArrowLeft';
    down: 'ArrowUp';
    up: 'ArrowDown';
};

type Coordinates = {
    x: number;
    y: number;
};

const snake: {
    x: number;
    y: number;
    tailPositions: Coordinates[];
    length: number;
    food?: Food;
    initialize: () => void;
    move: (direction: Direction[keyof Direction]) => void;
    eat: () => void;
    die: () => void;
    _checkIfHitWall: () => boolean;
    _checkIfHitTail: () => boolean;
} = {
    x: CANVAS_WIDTH_HEIGHT / 2 - SINGLE_GRID_SIZE,
    y: CANVAS_WIDTH_HEIGHT / 2 - SINGLE_GRID_SIZE,
    tailPositions: [],
    length: 1,

    initialize() {
        context.fillRect(snake.x, snake.y, SINGLE_GRID_SIZE, SINGLE_GRID_SIZE);
    },

    move(direction) {
        clearTimeout(this.movingTimeoutId);

        this.tailPositions.push({ x: snake.x, y: snake.y });

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

        if (this.x === this.food.x - 5 && this.y === this.food.y - 5) {
            console.log('snake eats!');
            this.eat();
            console.log(this.tailPositions);
        } else {
            context.clearRect(
                this.tailPositions[0].x,
                this.tailPositions[0].y,
                SINGLE_GRID_SIZE,
                SINGLE_GRID_SIZE
            );
            this.tailPositions.shift();
        }

        const shouldDie = this._checkIfHitWall() || this._checkIfHitTail();
        if (shouldDie) {
            this.tailPositions = [];
            return this.die();
        }

        this.movingTimeoutId = setTimeout(() => this.move(direction), 100);
    },

    eat() {
        this.length++;
        const newFood = new Food();
        newFood.create();
        this.food = newFood;
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

    _checkIfHitTail() {
        return this.tailPositions.some(
            (coords: Coordinates) =>
                coords.x === snake.x && coords.y === snake.y
        );
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
