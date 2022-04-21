import './reset.css';
import './style.css';
import snake from './snake';
import Food from './food';

snake.initialize();
const food = new Food();
food.create();
