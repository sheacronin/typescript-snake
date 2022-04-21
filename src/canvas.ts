export const CANVAS_WIDTH_HEIGHT = 300;
export const SINGLE_GRID_SIZE = CANVAS_WIDTH_HEIGHT / 30;

const gameCanvas = <HTMLCanvasElement>document.getElementById('game-canvas');
gameCanvas.width = CANVAS_WIDTH_HEIGHT;
gameCanvas.height = CANVAS_WIDTH_HEIGHT;

export const context = gameCanvas.getContext('2d');
