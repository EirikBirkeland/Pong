import * as CONSTANTS from './constants';
const { CANVAS_WIDTH, CANVAS_HEIGHT } = CONSTANTS;

export default class Board {
    static clear(ctx) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}