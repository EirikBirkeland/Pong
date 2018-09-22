import * as CONSTANTS from './constants';
const { CANVAS_WIDTH, CANVAS_HEIGHT, BOARD_START_Y, BALL_RADIUS, BALL_DIAMETER } = CONSTANTS;

export default class Ball {
    constructor(ctx, { color }) {
        this.ctx = ctx;
        this.X = CANVAS_WIDTH / 2;
        this.Y = CANVAS_HEIGHT / 2;
        this.previousX = null;
        this.increment = 2;
        this.color = color;
        this.directionX = "left";
        this.directionY = "up";
    }

    prepareNextMovement(directionX) {
        if (directionX) this.directionX = directionX;

        if (this.Y <= BOARD_START_Y + BALL_RADIUS) {
            this.directionY = "down";
        } else if (this.Y >= CANVAS_HEIGHT - BOARD_START_Y - BALL_RADIUS) {
            this.directionY = "up";
        }

        this.previousX = this.X;
        if (this.directionX === "left") {
            this.X -= this.increment;
        } else if (this.directionX === "right") {
            this.X += this.increment;
        }

        this.previousY = this.Y;
        if (this.directionY === "up") {
            this.Y -= this.increment;
        } else if (this.directionY === "down") {
            this.Y += this.increment;
        }
    }

    render() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.X, this.Y, BALL_DIAMETER, 0, 2 * Math.PI, false);
        this.ctx.closePath();
        this.ctx.fill();
    }
}