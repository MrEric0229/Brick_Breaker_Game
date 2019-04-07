export default class InputHandler {
  constructor(game) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37: //left arrow
          game.paddle.moveLeft();
          break;

        case 39: //right arrow
          game.paddle.moveRight();
          break;

        case 27: //ESC
          game.togglePause();
          break;

        case 32: //Space Bar
          game.start();
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 37:
          if (game.paddle.speed < 0) game.paddle.stop();
          break;

        case 39:
          if (game.paddle.speed > 0) game.paddle.stop();
          break;
      }
    });
  }
}
