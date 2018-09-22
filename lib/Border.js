import * as CONSTANTS from './constants';
const { CANVAS_WIDTH, CANVAS_HEIGHT, BOARD_OUTLINE_THICKNESS } = CONSTANTS;

export default class Border {
    constructor(ctx) {
        this.ctx = ctx;
     }
    clean() {
        this.ctx.clearRect(this.X, this.previousY, 20, PADDLE_HEIGHT);
    }
    render() {
        this.ctx.fillStyle = "rgb(255,255,255)";
        this.ctx.fillRect(0, 0, CANVAS_WIDTH, BOARD_OUTLINE_THICKNESS);
        this.ctx.fillRect(0, CANVAS_HEIGHT - BOARD_OUTLINE_THICKNESS, CANVAS_WIDTH, BOARD_OUTLINE_THICKNESS);
        this.ctx.restore();
    }
}