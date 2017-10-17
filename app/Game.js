import config from './config';
import State from './State';
import View from './View';

import ShapesGenerator from './generators/Shapes';
import Physics from "./Physics";

const DELTA_FREQUENCY = 20;
const DELTA_GRAVITATION = 0.5;
const DUMPED_FREQUENCY = 1000;
const TOP_DISGUISED = 75;
const BOTTOM_DISGUISED = 100;


export default class Main {
  constructor() {
    this._settings = config;
  }

  init() {
    this.state = new State(this._settings);
    this.view = new View({
      width: this._settings.width,
      height: this._settings.height,
      view: document.getElementById(this._settings.view)
    });
    this.shapesGenerator = new ShapesGenerator({
      width: this._settings.width,
      height: this._settings.height + BOTTOM_DISGUISED,
      gravity: this._settings.gravity,
      x: 0,
      y: TOP_DISGUISED * -1,
      backgroundColor: this._settings.backgroundColor
    });
    this.physics = new Physics(this.state);

    this._initSubscribes();

    this.shapesGenerator.generateBackground();
    return this;
  }

  start() {
    this.viewSub = this.view.render$.subscribe((time) => {
      const deltaTime = time - this.state.time;
      this.state.time = time;
      this.state.timer$.next(deltaTime);
      this.physics.gravitation(deltaTime);
      this.view.render(this.state);
    });
    return this;
  }

  stop() {
    this.viewSub.unsubscribe();
  }

  _initSubscribes() {
    this.state.timer$.subscribe((deltaTime) => {
      this.state.addFrequencyState(this.state.frequency);
      if (this.state.frequencyState > DUMPED_FREQUENCY) {
        this.state.resetFrequencyState();
        this.state.frequencyState$.next(this.state.frequencyState);
      }
    });

    this.state.frequencyState$.subscribe(() => {
      this.shapesGenerator.generateNewShape();
    });

    this.shapesGenerator.newShape$.subscribe((newShape) => {
      this.state.numberOfShapes++;
      this.state.areaOfAllShapes += newShape.area;
      this.state.stage.addChild(newShape);

      newShape.on('pointerdown', (interactionEvent) => {
        this.view.clickByShape$.next(interactionEvent);
      });
    });

    this.shapesGenerator.newBackground$.subscribe((backgroundShape) => {
      this.state.stage.addChild(backgroundShape);
      backgroundShape.on('pointerdown', (e) => {
        this.shapesGenerator.generateNewShape(e.data.global);
      });
    });

    this.physics.lostShape$.subscribe((shape) => {
      this.state.numberOfShapes--;
      this.state.areaOfAllShapes -= shape.area;
      shape.destroy();
    });

    this._initSubscribesControls();
  }

  _initSubscribesControls() {
    this.view.clickByShape$.subscribe((interactionEvent) => {
      this.state.numberOfShapes--;
      this.state.areaOfAllShapes -= interactionEvent.target.area;
      interactionEvent.target.destroy();
    });

    this.view.upGravity$.subscribe(() => {
      this.state.gravitate += DELTA_GRAVITATION;
    });

    this.view.downGravity$.subscribe(() => {
      this.state.gravitate -= DELTA_GRAVITATION;
    });

    this.view.upGenerated$.subscribe(() => {
      this.state.frequency += DELTA_FREQUENCY
    });

    this.view.downGenerated$.subscribe(() => {
      this.state.frequency -= DELTA_FREQUENCY
    });
  }

}