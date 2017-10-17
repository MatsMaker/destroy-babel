import {Subject} from 'rxjs/Subject';

import {getRandomArbitrary, randomHEXColor, sidesIntersection} from '../utils';
import Circle from '../shapes/Circle';
import Random from '../shapes/Random';
import Polygon from '../shapes/Polygon';
import Ellipse from '../shapes/Ellipse';


export default class ShapesGenerator {
  constructor(options = {}) {
    this._settings = Object.assign({
      width: 100,
      height: 100,
      x: 0,
      y: -100,
    }, options);

    this.newShape$ = new Subject();
    this.newBackground$ = new Subject();

    this.shapesGenerator = [Circle, Random, Polygon, Ellipse];
  }

  generateBackground() {
    if (this._background) {
      return background$.next(this._background);
    }
    this._background = new Polygon({
      static: true,
      color: this._settings.backgroundColor,
      vertices: [{x: 0, y: 0}, {
        x: this._settings.width, y: 0
      }, {
        x: this._settings.width, y: this._settings.height
      }, {
        x: 0, y: this._settings.height
      }]
    });
    this.newBackground$.next(this._background);
  }

  generateNewShape(point) {
    const newShapeIndex = getRandomArbitrary(0, this.shapesGenerator.length);
    const RandomShapeClass = this.shapesGenerator[newShapeIndex];

    let newShapeData;
    switch (newShapeIndex) {
      case 0:
        newShapeData = this._randomCircleShapeData(point);
        break;
      case 1:
        newShapeData = this._randomRandomShapeData(point);
        break;
      case 2:
        newShapeData = this._randomPolygonShapeData(point);
        break;
      case 3:
        newShapeData = this._randomEllipseShapeData(point);
        break;
    }
    this.newShape$.next(new RandomShapeClass(newShapeData));
  }

  _genRandomPoint(point, dispersion) {
    return {
      x: getRandomArbitrary(point.x - dispersion, point.x + dispersion),
      y: getRandomArbitrary(point.y - dispersion, point.y + dispersion)
    }
  }

  _genNexPoint(pointsList, dispersion) {
    const pointD = this._genRandomPoint(pointsList[pointsList.length - 1], dispersion);
    let inrersection = false;
    for (let index = 1; pointsList.length > index; index++) {
      if (sidesIntersection(pointsList[pointsList.length - 1], pointD, pointsList[index - 1], pointsList[index])
        || sidesIntersection(pointsList[0], pointD, pointsList[index - 1], pointsList[index])) {
        inrersection = true;
        break;
      }
    }
    if (inrersection) {
      return this._genNexPoint(pointsList, dispersion);
    } else {
      return pointD;
    }
  }

  _generateVertices(startPoint, sidesCount, dispersion) {
    const points = [];
    points.push(startPoint);
    points.push(this._genRandomPoint(startPoint, dispersion));
    points.push(this._genRandomPoint(points[1], dispersion));
    let index;
    for (index = 2; points.length < sidesCount; index++) {
      let nextPoint = this._genNexPoint(points, dispersion);
      points.push(nextPoint);
    }
    return points;
  }

  _randomCircleShapeData(point) {
    const radius = getRandomArbitrary(24, 34);
    const inAreaX = this._settings.width - (radius * 2);
    let startPoint = Object.assign({
      x: getRandomArbitrary(0, inAreaX),
      y: this._settings.y,
    }, point);
    return {
      radius,
      x: startPoint.x,
      y: startPoint.y,
      color: randomHEXColor()
    }
  }

  _randomRandomShapeData(point) {
    const startPoint = Object.assign({
      x: getRandomArbitrary(0, this._settings.width),
      y: this._settings.y
    }, point);
    const sidesCount = getRandomArbitrary(2, 8) * 2;
    const dispersion = getRandomArbitrary(60, 80);
    const vertices = this._generateVertices(startPoint, sidesCount, dispersion);
    vertices.push(startPoint);
    return {
      color: randomHEXColor(),
      vertices: vertices,
      drawVertices: true,
    }
  }

  _randomPolygonShapeData(point) {
    const startPoint = Object.assign({
      x: getRandomArbitrary(0, this._settings.width),
      y: this._settings.y
    }, point);
    const sidesCount = getRandomArbitrary(3, 6);
    const dispersion = getRandomArbitrary(60, 80);
    return {
      color: randomHEXColor(),
      vertices: this._generateVertices(startPoint, sidesCount, dispersion),
      drawVertices: true,
    }
  }

  _randomEllipseShapeData(point) {
    const startPoint = Object.assign({
      x: getRandomArbitrary(0, this._settings.width),
      y: this._settings.y,
    }, point);
    return {
      x: startPoint.x,
      y: startPoint.y,
      width: getRandomArbitrary(24, 80),
      height: getRandomArbitrary(24, 80),
      color: randomHEXColor(),
    }
  }
}