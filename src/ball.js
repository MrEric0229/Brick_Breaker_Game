import { collisionDetect } from "./collisionDetector";

export default class Ball {
  constructor(game) {
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.game = game;
    this.paddle = game.paddle;

    this.ballImage = document.getElementById("image_ball");

    this.size = 12;

    this.speed = {
      x: 10,
      y: 10
    };

    this.position = {
      x: this.paddle.position.x + this.paddle.width / 2,
      y: this.paddle.position.y - this.size
    };
  }

  update(dt) {
    if (!dt) return;

    let bottom = this.gameHeight - this.size;
    let right = this.gameWidth - this.size;
    // let topOfPaddle = this.paddle.position.y;
    // let leftOfPaddle = this.paddle.position.x;
    // let rightOfPaddle = this.paddle.position.x + this.paddle.width;

    if (this.position.x <= 0 || this.position.x >= right) {
      this.speed.x = -this.speed.x;
    }

    if (this.position.y <= 0) {
      this.speed.y = -this.speed.y;
    }

    if (this.position.y >= bottom) {
      this.game.life--;
      this.reset();
    }

    if (collisionDetect(this, this.paddle)) {
      this.speed.y = -this.speed.y;
    }

    this.position.x += this.speed.x / dt;
    this.position.y += this.speed.y / dt;
  }

  draw(ctx) {
    ctx.drawImage(
      this.ballImage,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  reset() {
    this.speed = {
      x: 10,
      y: 10
    };

    this.position = {
      x: this.paddle.position.x + this.paddle.width / 2,
      y: this.paddle.position.y - this.size
    };
  }
}
