import {AShape} from "./AShape";


export default class Ellipse extends AShape {

  _approveSettings(options) {
    this.settings = Object.assign({
      x: 0,
      y: 0,
      height: 10,
      width: 80,
      color: 0xFFFF0B
    }, options);
  }

  _draw() {
    this.drawEllipse(this.settings.x, this.settings.y, this.settings.width, this.settings.height);
  }
}