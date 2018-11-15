let canvas;
let gameState;
let paddle;
let ball = [];
let ballSpeed;
let maxBallSpeed;
let points;
let itemcost;
let exampleBall;

function setup() {
  canvas = createCanvas(800, 650);
  canvas.parent("gameArea");
  gameState = "gameSettings";
  ballSpeed = 4;
  maxBallSpeed = 4;
  paddle = new Paddle(width / 2, height - 20, 1);
  ball[0] = new Ball(width / 2, height / 2);
  points = 100;
  itemCost = {
    buyBall: 10,
    ballSpeed: 10,
    paddleLength: 10
  }
  exampleBall = new Ball(width/2 - 10, 150);
}

function draw() {

  if (gameState == "gameScreen") {
    canvas.parent("gameArea");
    background(0);
    for (let i = 0; i < ball.length; i++) {
      ball[i].show();
      ball[i].wallCollision();
      ball[i].update();
      if (ball[i].bottomCollision()) {
        if (ball.length > 1) {
          ball.splice(i, 1);
          itemCost.buyBall = itemCost.buyBall / 1.1;
          document.getElementById("buyBallButton").innerHTML = "Buy another ball </br> Cost: " + round(itemCost.buyBall);
          i--;
        } else {
          ball[i].respawn();
        }
      }
    }
    paddle.show();
    paddle.move();
    for (let i = 0; i < ball.length; i++) {
      if (paddle.ballCollision(ball[i])) {
        let collisionX = ball[i].x + ball[i].w / 2 - paddle.x;
        let xChange = map(collisionX, - ball[i].w / 2, paddle.w + ball[i].w / 2, 0.5, 2.5);
        ball[i].paddleBounce(xChange);
        ball[i].setPos(ball[i].x, paddle.y - ball[i].h);
        points++;
      }
    }
    drawScore();
  } else if (gameState == "gameSettings") {
    background(0);
    exampleBall.setVelocity(3, 0);
    exampleBall.update();
    exampleBall.show();
    exampleBall.wallCollision();
    print(width);
    document.getElementById("ballSpeedSlideText").innerHTML = "Current Ball Speed: " + document.getElementById("ballSpeedSlide").value;
    if(ballSpeed != document.getElementById("ballSpeedSlide").value){
      ballSpeed = document.getElementById("ballSpeedSlide").value;
      for(let i = 0; i < ball.length; i++){
        ball[i].updateSpeed(ballSpeed);
      }
    }
    document.getElementById("paddleLengthSlideText").innerHTML = "Current Paddle Length: " + document.getElementById("paddleLengthSlide").value;
  }

  //Top menu buttons
  document.getElementById("gameScreenButton").onclick = function(){
    changeGameState("gameScreen");
    print(gameState);
  }
  document.getElementById("gameSettingsButton").onclick = function(){
    changeGameState("gameSettings");
    print(gameState);
  }

  //Buy menu buttons
  document.getElementById("buyBallButton").onclick = buyBall;
  document.getElementById("buyBallSpeedButton").onclick = buyBallSpeed;
  document.getElementById("buyPaddleLengthButton").onclick = buyPaddleLength;

  //Game settings menu texts
  
}



function insideGameScreen(x, y) {
  return (x > 0 &&
    x < width &&
    y > 0 &&
    y < height);
}

function buyBall() {
  if (points >= itemCost.buyBall) {
    points -= itemCost.buyBall;
    itemCost.buyBall = 10;
    for (let i = 0; i < ball.length; i++) {
      itemCost.buyBall = itemCost.buyBall * 1.1;
    }
    let b = new Ball(width / 2, height / 2);
    ball.push(b);
    document.getElementById("buyBallButton").innerHTML = "Buy another ball </br> Cost: " + round(itemCost.buyBall);
  }
}

function buyBallSpeed(){
  if (points >= itemCost.ballSpeed) {
    points -= itemCost.ballSpeed;
    itemCost.ballSpeed = round(itemCost.ballSpeed * 1.1);
    maxBallSpeed++;
    document.getElementById("buyBallSpeedButton").innerHTML = "Increase maximum ball speed </br> Cost: " + round(itemCost.ballSpeed);
    document.getElementById("ballSpeedSlide").max = maxBallSpeed;
  }
}

function buyPaddleLength(){
  if(points >= itemCost.paddleLength) {
    points -= itemCost.paddleLength;
    itemCost.paddleLength = round(itemCost.paddleLength * 2);
    paddle.changeLength(1.1);
    document.getElementById("buyPaddleLengthButton").innerHTML = "Increase paddle length </br> Cost: " + round(itemCost.paddleLength);
  }
}


function drawScore() {
  fill(255);
  textSize(30);
  text("Points: " + round(points), width / 2, 50);
  textAlign(CENTER);
}

function changeGameState(newGameState) {
  gameState = newGameState;
  switch(newGameState){
    case "gameScreen":
      document.getElementById("gameSettingsScreen").style.left = "-9999px";
      let topButtons =  document.getElementsByClassName("topButton");
      for(let i = 0; i < topButtons.length; i++){
        topButtons[i].style.backgroundColor = "#0D47A1"
      }
      document.getElementById("gameScreenButton").style.backgroundColor = "#1565c0";
      break;
    case "gameSettings":
      document.getElementById("gameSettingsScreen").style.left = "0px";
      setTopButtonColors("gameSettingsButton");
      break;
  }
}

function setTopButtonColors(elementId) {
  let topButtons =  document.getElementsByClassName("topButton");
  for(let i = 0; i < topButtons.length; i++){
    topButtons[i].style.backgroundColor = "#0D47A1";
  }
  document.getElementById(elementId).style.backgroundColor = "#1565c0";
}