class Ball {

    constructor(x, y, ballW = 20, ballH = 20) {
        this.x = x;
        this.y = y;
        this.w = ballW;
        this.h = ballH;
        this.ballSpeed = ballSpeed
        let vel = random(1.7, 3);
        this.velocity = createVector(cos(vel) * this.ballSpeed, sin(vel) * this.ballSpeed);
    }

    show() {
        fill(255);
        noStroke();
        rect(this.x, this.y, this.w, this.h);
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    setVelocity(xSpeed, ySpeed){
        this.velocity.x = xSpeed;
        this.velocity.y = ySpeed;
    }

    wallCollision() {
        if (this.x < 0) {
            this.bounce(-1, 1);
        }  else if ((this.x + this.w) > width) {
            this.bounce(-1, 1);
        } 
        if (this.y < 0) {
            this.bounce(1, -1);
        }
        
    }

    bottomCollision() {
        return this.y > height;
            
    }

    bounce(xChange, yChange) {
        this.velocity.x = this.velocity.x * xChange;
        this.velocity.y = this.velocity.y * yChange;
    }

    paddleBounce(angle) {
        this.velocity.x = -this.ballSpeed * cos(angle);
        this.velocity.y = -this.ballSpeed * sin(angle);
    }

    respawn() {
        this.x = (width) / 2;
        this.y = (height) / 2;
    }

    updateSpeed(ballSpeed){
        this.velocity.x = this.velocity.x / this.ballSpeed * ballSpeed;
        this.velocity.y = this.velocity.y / this.ballSpeed * ballSpeed;
        this.ballSpeed = ballSpeed;
    }

}