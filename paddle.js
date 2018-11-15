class Paddle {

    constructor(x, y, player, paddleW = 100, paddleH = 20) {
        this.x = x;
        this.y = y - paddleH / 2;
        this.w = paddleW;
        this.h = paddleH;
        this.speed = 4;
        this.score = 0;
    }

    show() {
        noStroke();
        fill(255);
        rect(this.x, this.y, this.w, this.h);
    }
    move() {
        this.x = mouseX - this.w / 2;
        if(mouseX - this.w / 2 > width - this.w){
            this.x = width - this.w;
        } else if (mouseX - this.w / 2 < 0){
            this.x = 0;
        }
    }
    ballCollision(ball) {
        if (this.x < ball.x + ball.w &&
            this.x + this.w > ball.x &&
            this.y < ball.y + ball.h &&
            this.y + this.h > ball.y) {
            return true;
        }
        return false;
    }
    autoMove(ball) {
        if (this.x < ball.x || this.x + this.w > ball.x + ball.w) {
            this.x = ball.x;
        }
        if (this.x > width - this.w){
            this.x = width - this.w;
        }
    }

    changeLength(change){
        this.w = round(this.w * change);
    }

    setLength(length) {
        this.w = length;
    }
}