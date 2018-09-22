import * as CONSTANTS from './constants';
const { CANVAS_WIDTH, CANVAS_PADDING } = CONSTANTS;

export default class Score {
    constructor(ctx) {
        this.ctx = ctx;
        this.scoreLeft = 0;
        this.scoreRight = 0;
    }
    incrementLeft() {
        this.scoreLeft += 1;
    }
    incrementRight() {
        this.scoreRight += 1;
    }
    get highestScore() {
        return this.scoreLeft > this.scoreRight ? this.scoreLeft : this.scoreRight;
    }
    clean() {
        this.ctx.clearRect(textX - 100, CANVAS_PADDING, str.length * 40, 30);
    }
    render() {
        const str = this.scoreLeft + " - " + this.scoreRight;
        const textX = CANVAS_WIDTH / 2 - str.length / 2 * 15;
        this.ctx.font = "30px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(str, textX, CANVAS_PADDING + 25);
    }
}