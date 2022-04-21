import { CANVAS_WIDTH_HEIGHT, SINGLE_GRID_SIZE, context } from './canvas';

const snake = {
    x: CANVAS_WIDTH_HEIGHT / 2 - SINGLE_GRID_SIZE,
    y: CANVAS_WIDTH_HEIGHT / 2 - SINGLE_GRID_SIZE,
    width: SINGLE_GRID_SIZE,
    height: SINGLE_GRID_SIZE,
    length: 1,
    initialize() {
        context.fillRect(snake.x, snake.y, snake.width, snake.height);
    },
    move() {
        context.clearRect(
            snake.x,
            snake.y,
            snake.x + snake.width,
            snake.y + snake.height
        );

        context.fillRect(
            snake.x + SINGLE_GRID_SIZE,
            snake.y,
            snake.width,
            snake.height
        );

        snake.x = snake.x + SINGLE_GRID_SIZE;
    },
};

export default snake;
