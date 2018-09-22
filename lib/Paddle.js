import * as CONSTANTS from './constants';
const { CANVAS_WIDTH, CANVAS_HEIGHT, PADDLE_HEIGHT, PADDLE_SPEED } = CONSTANTS;

let debug = true;

export default class Paddle {
    constructor(ctx, side) {
        this.ctx = ctx;
        this.side = side;
        this.X = this.side === "left" ? 20 : CANVAS_WIDTH - 20;
        this.Y = CANVAS_HEIGHT / 2;
        this.width = 20;
        this.height = PADDLE_HEIGHT;
        this.center = {
            X: () => this.X + (this.width / 2),
            Y: () => this.Y + (this.height / 2),
        }

        this.previousY = null;
        this.direction = Boolean(Math.round(Math.random())) ? "up" : "down";
    }

    moveUp() {
        this.previousY = this.Y;
        this.Y -= PADDLE_SPEED;
    }

    moveDown() {
        this.previousY = this.Y;
        this.Y += PADDLE_SPEED;
    }

    clean() {
        this.ctx.clearRect(this.X, this.previousY, this.width, this.height);
    }

    render() {
        if (this.Y >= CANVAS_HEIGHT) {
            this.direction = "up";
        } else if (this.Y <= 0) {
            this.direction = "down";
        }

        this.ctx.fillStyle = "rgb(0,200,0)";
        this.ctx.fillRect(this.X, this.Y, this.width, this.height);

        if (debug) {
            this.ctx.beginPath();
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.center.X(), this.center.Y(), 3, 3);
            this.ctx.closePath();
            this.ctx.fill();
        }
    }
}