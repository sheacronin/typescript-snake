import './reset.css';
import './style.css';
import Food from './food';
import { context, CANVAS_WIDTH_HEIGHT } from './canvas';
import Snake from './snake';
import events from './events';
import messages from './messages';

let snake: Snake;
let food: Food;

function startGame() {
    snake = new Snake();
    snake.create();
    food = new Food();
    food.create();
    snake.food = food;
    document.addEventListener('keydown', moveSnakeWithKeys);
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
    if (snake.x === food.x - 5 && snake.y === food.y - 5) {
        console.log('snake touched food');
        return true;
    } else {
        return false;
    }
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
