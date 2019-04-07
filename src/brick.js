import { collisionDetect } from "./collisionDetector";

export default class Brick {
  constructor(game, position) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.paddle = game.paddle;
    this.ball = game.ball;

    this.delete = false;

    this.brickImage = document.getElementById("image_brick");

    this.width = 80;
    this.height = 30;

    this.position = position;
  }

  update() {
    if (collisionDetect(this.ball, this)) {
      this.ball.speed.y = -this.ball.speed.y;
      this.delete = true;
    }
  }

  draw(ctx) {
    ctx.drawImage(
      this.brickImage,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
