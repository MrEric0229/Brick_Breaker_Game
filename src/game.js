import Paddle from "./paddle";
import InputHandler from "./input";
import Ball from "./ball";
import Brick from "./brick";
import { buildLevel, level1, level2 } from "./levels";

const GAME_STATE = {
  PAUSED: 0,
  RUNNING: 1,
  END: 2,
  MENU: 3
};

// const LEVEL = {
//   LEVEL1: "level1",
//   LEVEL2: "level2",
//   LEVEL3: "level3"
// };

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gameState = GAME_STATE.MENU;

    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    this.gameObjects = [];
    this.levels = [level1, level2];
    this.currentLevel = 0;

    new InputHandler(this);
  }

  start() {
    let bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.gameObjects = [this.ball, this.paddle, ...bricks];

    this.gameState = GAME_STATE.RUNNING;
    this.life = 3;
    this.paddle.reset();
    this.ball.reset();
  }

  togglePause() {
    if (this.gameState === GAME_STATE.PAUSED) {
      this.gameState = GAME_STATE.RUNNING;
    } else {
      this.gameState = GAME_STATE.PAUSED;
    }
  }

  update(dt) {
    if (this.gameState !== GAME_STATE.RUNNING) return;

    this.gameObjects.forEach(object => {
      object.update(dt);
    });

    this.gameObjects = this.gameObjects.filter(object => !object.delete);

    if (this.gameObjects.length === 2) {
      this.currentLevel++;
      this.paddle.reset();
      this.ball.reset();
      let bricks = buildLevel(this, this.levels[this.currentLevel]);
      this.gameObjects = [this.ball, this.paddle, ...bricks];
    }

    if (this.life === 0) {
      this.gameState = GAME_STATE.END;
    }
  }

  draw(ctx) {
    this.gameObjects.forEach(object => {
      object.draw(ctx);
    });

    ctx.font = "30px Arial";
    ctx.fillStyle = "#FE2D00";
    ctx.textAlign = "center";
    ctx.fillText(
      "Level " + (this.currentLevel+1) + "  Life: " + this.life,
      this.gameWidth / 2,
      30
    );

    if (this.gameState === GAME_STATE.PAUSED) {
      ctx.fillStyle = "rgba(0,0,0,.5)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gameState === GAME_STATE.MENU) {
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Hit SPACE to start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gameState === GAME_STATE.END) {
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);

      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);

      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Hit Space to restart a game",
        this.gameWidth / 2,
        this.gameHeight / 2 + 60
      );
    }
  }
}
