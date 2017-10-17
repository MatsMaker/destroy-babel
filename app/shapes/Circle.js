import {AShape} from './AShape';


export default class Circle extends AShape {
  get area() {
    return this._area;
  }

  _approveSettings(options) {
    this.settings = Object.assign({
      x: 0,
      y: 0,
      radius: 10,
      color: 0xFFFF0B
    }, options);
  }

  _draw() {
    this.drawCircle(this.settings.x, this.settings.y, this.settings.radius);
    this.endFill();
  }
}