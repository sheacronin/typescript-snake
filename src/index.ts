import './reset.css';
import './style.css';
import snake from './snake';
import { context } from './canvas';

context.beginPath();
context.arc(10, 10, 5, 0, Math.PI * 2);
context.stroke();

snake.initialize();
