import * as CONSTANTS from './constants';
const { CANVAS_WIDTH, CANVAS_HEIGHT, BOARD_START_Y, BALL_RADIUS, BALL_DIAMETER } = CONSTANTS;

let debug = true;

export default class Ball {
    constructor(ctx, { color }) {
        this.ctx = ctx;
        this.X = CANVAS_WIDTH / 2;
        this.Y = CANVAS_HEIGHT / 2;
        this.previousX = null;
        this.previousY = null;
        this.increment = 2;
        this.color = color;
        this.direction = {
            X: "left",
            Y: "up",
        }
        this.changedRecently = false;
    }

    prepareNextMovement(directionX) {
        if (this.changedRecently) {
            --this.changedRecently;
        }

        if (directionX && !this.changedRecently) {
            this.direction.X = directionX;
            this.changedRecently = 5;
        };

        if (this.isTouchingTop) {
            this.direction.Y = "down";
        } else if (this.isTouchingBottom) {
            this.direction.Y = "up";
        }

        this.previousX = this.X;
        if (this.direction.X === "left") {
            this.X -= this.increment;
        } else if (this.direction.X === "right") {
            this.X += this.increment;
        }

        this.previousY = this.Y;
        if (this.direction.Y === "up") {
            this.Y -= this.increment;
        } else if (this.direction.Y === "down") {
            this.Y += this.increment;
        }
    }
    
    get isTouchingTop () {
        return this.Y <= BOARD_START_Y + BALL_RADIUS
    }

    get isTouchingBottom () {
        return this.Y >= CANVAS_HEIGHT - BOARD_START_Y - BALL_RADIUS
    }
    render() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(this.X, this.Y, BALL_DIAMETER, 0, 2 * Math.PI, false);
        this.ctx.closePath();
        this.ctx.fill();

        if (debug) {
            this.ctx.beginPath();
            this.ctx.fillStyle = "red";
            this.ctx.fillRect(this.X, this.Y, 3, 3);
            this.ctx.closePath();
            this.ctx.fill();
        }
        
    }
}