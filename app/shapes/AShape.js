import {Graphics} from 'pixi.js';

import {guid} from '../utils';


export class AShape extends Graphics {
  get area() {
    return this._area;
  }

  constructor(options) {
    if (new.target === AShape) {
      throw new TypeError("Cannot construct AShape instances directly");
    }
    super(options.nativeLines);

    this.num = guid();
    this._init(options);
  }

  _init(options) {
    this._approveSettings(options);

    this._beforeDraw();
    this._draw();
    this._afterDraw();
  }

  _approveSettings(options) {
    this.settings = Object.assign({
      static: false,
      shape: this.settings.shape,
    }, options);
  }

  _beforeDraw() {
    this.lineStyle(0);
    this.beginFill(this.settings.color, 1);
  }

  _draw() {
    this.drawShape(this.settings.shape);
  }

  _afterDraw() {
    this.endFill();
    this.interactive = true;
    this.live = true;
  }
}