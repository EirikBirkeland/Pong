import * as CONSTANTS from './constants';
const { CANVAS_WIDTH, CANVAS_HEIGHT, PADDLE_HEIGHT, PADDLE_SPEED } = CONSTANTS;

export default class Paddle {
    constructor(ctx, side) {
        this.ctx = ctx;
        this.side = side;
        this.X = this.side === "left" ? 20 : CANVAS_WIDTH - 20;
        this.Y = CANVAS_HEIGHT / 2;
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
        this.ctx.clearRect(this.X, this.previousY, 20, PADDLE_HEIGHT);
    }
    
    render() {
        if (this.Y >= CANVAS_HEIGHT) {
            this.direction = "up";
        } else if (this.Y <= 0) {
            this.direction = "down";
        }
        
        this.ctx.fillStyle = "rgb(0,200,0)";
        this.ctx.fillRect(this.X, this.Y, 20, PADDLE_HEIGHT);
        this.ctx.restore();
    }
}