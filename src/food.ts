import { context, SINGLE_GRID_SIZE, CANVAS_WIDTH_HEIGHT } from './canvas';

class Food {
    x: number;
    y: number;

    create() {
        context.fillStyle = '#5747D6';
        context.beginPath();
        this.x = this._getRandomCoordinate();
        this.y = this._getRandomCoordinate();
        context.arc(this.x, this.y, SINGLE_GRID_SIZE / 2, 0, Math.PI * 2);
        context.fill();
        console.log('food', this.x, this.y);
    }

    _getRandomCoordinate() {
        return (
            Math.floor(
                (Math.random() * CANVAS_WIDTH_HEIGHT) / SINGLE_GRID_SIZE
            ) *
                SINGLE_GRID_SIZE +
            SINGLE_GRID_SIZE / 2
        );
    }
}

export default Food;
