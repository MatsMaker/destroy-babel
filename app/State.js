import {Subject} from 'rxjs/Subject';
import {Container} from 'pixi.js';


export default class State {
  constructor(options) {
    this._settings = options;
    this.stage = new Container();

    this.numberOfShapes = 0;
    this.areaOfAllShapes = 0;
    this.time = 0;

    this.timer$ = new Subject();
    this.frequencyState$ = new Subject();

    this._gravitate = this._settings.gravity;
    this._frequency = this._settings.frequency;
    this._frequencyState = 0;
  }

  set gravitate(value) {
    this._gravitate = value || 1;
  }

  get gravitate() {
    return this._gravitate;
  }

  get frequency() {
    return this._frequency;
  }

  set frequency(value) {
    return this._frequency = value;
  }

  get frequencyState() {
    return this._frequencyState;
  }

  addFrequencyState(value) {
    this._frequencyState += value;
  }

  resetFrequencyState() {
    this._frequencyState = 0;
  }

  get settings() {
    return this._settings
  }

}