import {randomColor} from 'randomcolor';

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function sidesIntersection(pointA, pointB, pointC, pointD) {
  const ax1 = pointA.x,
    ay1 = pointA.y,
    ax2 = pointB.x,
    ay2 = pointB.y,
    bx1 = pointC.x,
    by1 = pointC.y,
    bx2 = pointD.x,
    by2 = pointD.y;

  const v1 = (bx2 - bx1) * (ay1 - by1) - (by2 - by1) * (ax1 - bx1);
  const v2 = (bx2 - bx1) * (ay2 - by1) - (by2 - by1) * (ax2 - bx1);
  const v3 = (ax2 - ax1) * (by1 - ay1) - (ay2 - ay1) * (bx1 - ax1);
  const v4 = (ax2 - ax1) * (by2 - ay1) - (ay2 - ay1) * (bx2 - ax1);
  return (v1 * v2 < 0) && (v3 * v4 < 0);
}

function randomHEXColor() {
  return randomColor({format: 'hex'}).replace(/#/g, '0x');
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

export {
  getRandomArbitrary,
  sidesIntersection,
  randomHEXColor,
  guid
}