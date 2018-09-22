import * as CONSTANTS from './lib/constants';
const { CANVAS_WIDTH, CANVAS_HEIGHT, LEVEL_PADDING, BALL_RADIUS, BOARD_OUTLINE_THICKNESS } = CONSTANTS;

import Paddle from './lib/Paddle';
import Ball from './lib/Ball';
import Score from './lib/Score';
import Border from './lib/Border';
import Board from './lib/Board';

const canvas = document.createElement('canvas');
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.id = "myCanvas";
document.getElementById('root').appendChild(canvas);
const ctx = canvas.getContext("2d");

let downArrowKeyIsDepressed;
let upArrowKeyIsDepressed;
let wKeyIsDepressed;
let sKeyIsDepressed;

window.addEventListener("keydown", e => {
    e.preventDefault();
    downArrowKeyIsDepressed = e.which === 40;
    upArrowKeyIsDepressed = e.which === 38;
});

window.addEventListener("keyup", e => {
    e.preventDefault();
    downArrowKeyIsDepressed = !e.which === 40;
    upArrowKeyIsDepressed = !e.which === 38;
});

window.addEventListener("keydown", e => {
    e.preventDefault();
    wKeyIsDepressed = e.which === 87;
    sKeyIsDepressed = e.which === 83;
});

window.addEventListener("keyup", e => {
    e.preventDefault();
    wKeyIsDepressed = !e.which === 87;
    sKeyIsDepressed = !e.which === 83;
});

let paddleLeft;
let paddleRight;
let ball;
let score;
let border;

function init() {
    paddleLeft = new Paddle(ctx, "left", true);
    paddleRight = new Paddle(ctx, "right", false);
    ball = new Ball(ctx, { color: "white" });
    score = new Score(ctx);
    border = new Border(ctx);
}

function restart() {
    ball = null;
    ball = new Ball(ctx, { color: "white" });
    setTimeout(() => requestAnimationFrame(gameLoop));
}

function gameLoop() {
    Board.clear(ctx);

    if (score.highestScore >= 10) {
        return;
    }

    if (ball.X <= LEVEL_PADDING + BALL_RADIUS) {
        score.incrementRight();
        score.render();
        return restart();
    } else if (ball.X >= CANVAS_WIDTH - LEVEL_PADDING - BALL_RADIUS) {
        score.incrementLeft();
        score.render();
        return restart();
    }

    const BORDER_TOP_EDGE = BOARD_OUTLINE_THICKNESS + 5;
    const BORDER_BOTTOM_EDGE = CANVAS_HEIGHT - 105;
    
    if (wKeyIsDepressed && paddleLeft.Y > BORDER_TOP_EDGE) {
        paddleLeft.moveUp();
    } else if (sKeyIsDepressed && paddleLeft.Y < BORDER_BOTTOM_EDGE) {
        paddleLeft.moveDown();
    } else if (upArrowKeyIsDepressed && paddleRight.Y > BORDER_TOP_EDGE) {
        paddleRight.moveUp();
    } else if (downArrowKeyIsDepressed && paddleRight.Y < BORDER_BOTTOM_EDGE) {
        paddleRight.moveDown();
    }

    paddleLeft.render();
    paddleRight.render();
    border.render();

    if (
        (ball.X <= paddleLeft.X + 30 &&
            ball.Y >= paddleLeft.Y - 60 &&
            ball.Y <= paddleLeft.Y + 60) ||
        (ball.X >= paddleRight.X - 15 &&
            ball.Y <= paddleRight.Y + 60 &&
            ball.Y >= paddleRight.Y - 60)
    ) {
        console.warn("smack!");
        ball.prepareNextMovement(ball.direction.X === "left" ? "right" : "left");
    } else {
        ball.prepareNextMovement();
    }
    score.render();
    ball.render();

    requestAnimationFrame(gameLoop);
}

init();
gameLoop();