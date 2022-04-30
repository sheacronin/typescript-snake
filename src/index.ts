import './reset.css';
import './style.css';
import Food from './food';
import { context, CANVAS_WIDTH_HEIGHT, SINGLE_GRID_SIZE } from './canvas';
import Snake, { Direction } from './snake';
import events from './events';
import messages from './messages';

let snake: Snake;
let food: Food;

const arrowButtons = Array.from(
    document.getElementsByClassName('arrow-button')
);
console.log(arrowButtons);

function startGame() {
    snake = new Snake();
    snake.create();
    food = new Food();
    food.create();
    snake.food = food;
    document.addEventListener('keydown', moveSnakeWithKeys);
    arrowButtons.forEach((button) =>
        button.addEventListener('click', moveSnakeWithButtons)
    );
}

const restartBtn = document.getElementById('restart-btn');
restartBtn.addEventListener('click', () => {
    // Clear entire canvas.
    context.clearRect(0, 0, CANVAS_WIDTH_HEIGHT, CANVAS_WIDTH_HEIGHT);
    messages.clear();
    startGame();
});

events.on('snakeMoves', () => {
    if (doesSnakeTouchFood()) {
        snake.eat();
        food = new Food();
        food.create();
    } else {
        snake.clearLastTailUnit();
    }
});

events.on('snakeDies', () => {
    document.removeEventListener('keydown', moveSnakeWithKeys);
    messages.die();
});

function doesSnakeTouchFood() {
    if (
        snake.x === food.x - SINGLE_GRID_SIZE / 2 &&
        snake.y === food.y - SINGLE_GRID_SIZE / 2
    ) {
        console.log('snake touched food');
        return true;
    } else {
        return false;
    }
}

function moveSnakeWithButtons(e: PointerEvent) {
    snake.move((<HTMLButtonElement>e.target).id as Direction);
}

function moveSnakeWithKeys(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') {
        snake.move('up');
    } else if (e.key === 'ArrowDown') {
        snake.move('down');
    } else if (e.key === 'ArrowRight') {
        snake.move('right');
    } else if (e.key === 'ArrowLeft') {
        snake.move('left');
    }
}

startGame();
