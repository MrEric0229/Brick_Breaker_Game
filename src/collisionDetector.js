export function collisionDetect(ball, object) {
  let topOfBall = ball.position.y;
  let bottomOfBall = topOfBall + +ball.size;
  let leftOfBall = ball.position.x;
  let rightOfBall = leftOfBall + ball.size;

  let topOfObject = object.position.y;
  let bottomOfObject = topOfObject + object.height;
  let leftOfObject = object.position.x;
  let rightOfObject = leftOfObject + object.width;

  if (
    topOfBall <= bottomOfObject &&
    bottomOfBall >= topOfObject &&
    leftOfBall >= leftOfObject &&
    rightOfBall <= rightOfObject
  ) {
    return true;
  }
  // else if (
  //   bottomOfBall = topOfObject &&
  //   leftOfBall >= leftOfObject &&
  //   rightOfBall <= rightOfObject
  // ) {
  //   return true;
  // }
  return false;
}
