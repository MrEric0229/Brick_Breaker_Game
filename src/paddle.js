export default class Paddle {
  constructor(game) {
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;

    this.width = 150;
    this.height = 20;

    this.speed = 0;

    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: this.gameHeight - this.height - 10
    };
  }

  moveLeft() {
    this.speed = -15;
  }

  moveRight() {
    this.speed = 15;
  }

  stop() {
    this.speed = 0;
  }

  update(dt) {
    if (!dt) return;

    this.position.x += this.speed / dt;

    if (this.position.x <= 0) this.position.x = 0;
    if (this.position.x >= this.gameWidth - this.width)
      this.position.x = this.gameWidth - this.width;
  }

  draw(ctx) {
    ctx.fillStyle = "#0ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  reset() {
    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: this.gameHeight - this.height - 10
    };
  }
}
