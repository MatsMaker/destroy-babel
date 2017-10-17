import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/interval';

import {CanvasRenderer} from 'pixi.js'


export default class extends CanvasRenderer {
  constructor(options) {
    const settings = Object.assign({
      width: 800,
      height: 600,
      view: document.getElementById('view'),
      interval: 16,
      controllers: {
        upGravity: document.getElementById('up-gravity'),
        downGravity: document.getElementById('down-gravity'),
        upGenerated: document.getElementById('up-generated'),
        downGenerated: document.getElementById('down-generated'),
      },
      interfaces: {
        numberOfCountEl: document.getElementById('number-of-shapes'),
        surfaceAreaOccupied: document.getElementById('surface-area-occupied'),
      }
    }, options);
    super(settings);

    this._settings = settings;
    this.render$ = new Observable.interval(this._settings.interval);
    this._initControllersObservable('click');

  }

  get settings() {
    return this._settings;
  }

  render(state) {
    super.render(state.stage);
    this.rerenderInterface(state);
  }

  rerenderInterface(state) {
    this._settings.interfaces.numberOfCountEl.innerHTML = state.numberOfShapes;
    this._settings.interfaces.surfaceAreaOccupied.innerHTML = this._getDrawnPixelShapes();
  }

  _getDrawnPixelShapes() {
    let numOfColoredPix = 0;
    let context = this._settings.view.getContext(("2d"));
    let pixData = context.getImageData(0, 0, this._settings.width, this._settings.height).data;
    for (let i = 3; i < pixData.length; i += 4) {
      if (pixData[i - 3] !== 0
        || pixData[i - 2] !== 0
        || pixData[i - 1] !== 0) {
        numOfColoredPix++;
      }
    }
    return numOfColoredPix;
  }

  _initControllersObservable(eventName) {
    const controllers = this._settings.controllers;
    for (let listenerKey in controllers) {
      this[`${listenerKey}$`] = Observable.fromEvent(controllers[listenerKey], eventName);
    }

    this.clickByShape$ = new Subject();
  }
}