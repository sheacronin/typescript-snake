import { CANVAS_WIDTH_HEIGHT, SINGLE_GRID_SIZE, context } from './canvas';
import Food from './food';
import events from './events';

type Direction = 'up' | 'right' | 'down' | 'left';

type Coordinates = {
    x: number;
    y: number;
};

class Snake {
    x: number;
    y: number;
    tailPositions: Coordinates[];
    length: number;
    food?: Food;
    movingTimeoutId?: NodeJS.Timeout;

    constructor() {
        this.x = CANVAS_WIDTH_HEIGHT / 2 - SINGLE_GRID_SIZE;
        this.y = CANVAS_WIDTH_HEIGHT / 2 - SINGLE_GRID_SIZE;
        this.tailPositions = [];
        this.length = 1;
    }

    create() {
        context.fillRect(this.x, this.y, SINGLE_GRID_SIZE, SINGLE_GRID_SIZE);
    }

    move(direction: Direction) {
        clearTimeout(this.movingTimeoutId);

        this.tailPositions.push({ x: this.x, y: this.y });

        switch (direction) {
            case 'right':
                this.x += SINGLE_GRID_SIZE;
                break;
            case 'left':
                this.x -= SINGLE_GRID_SIZE;
                break;
            case 'up':
                this.y -= SINGLE_GRID_SIZE;
                break;
            case 'down':
                this.y += SINGLE_GRID_SIZE;
                break;
        }

        context.fillRect(this.x, this.y, SINGLE_GRID_SIZE, SINGLE_GRID_SIZE);

        events.emit('snakeMoves', null);

        const shouldDie = this._checkIfHitWall() || this._checkIfHitTail();
        if (shouldDie) {
            this.tailPositions = [];
            return this.die();
        }

        this.movingTimeoutId = setTimeout(() => this.move(direction), 100);
    }

    eat() {
        this.length++;
    }

    clearLastTailUnit() {
        context.clearRect(
            this.tailPositions[0].x,
            this.tailPositions[0].y,
            SINGLE_GRID_SIZE,
            SINGLE_GRID_SIZE
        );
        this.tailPositions.shift();
    }

    die() {
        clearTimeout(this.movingTimeoutId);
        console.log('YOU DIED');
        events.emit('snakeDies', null);
    }

    _checkIfHitWall() {
        if (
            this.x < 0 ||
            this.y < 0 ||
            this.x > CANVAS_WIDTH_HEIGHT - SINGLE_GRID_SIZE ||
            this.y > CANVAS_WIDTH_HEIGHT - SINGLE_GRID_SIZE
        ) {
            return true;
        } else {
            return false;
        }
    }

    _checkIfHitTail() {
        return this.tailPositions.some(
            (coords: Coordinates) => coords.x === this.x && coords.y === this.y
        );
    }
}

export default Snake;
