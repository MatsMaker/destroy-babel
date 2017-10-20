import {Subject} from 'rxjs/Subject';

const DEEP_OF_TRACKING = 100;
const LEVEL_OF_TRACKING = -100;

export default class Physics {
  constructor(state) {
    this.state = state;

    this.lostShape$ = new Subject();
  }

  gravitation(deltaTime) {
    this.state.stage.children.filter(shape => !shape.settings.static).forEach((figure) => {
      figure.position.y += this.state.gravitate * deltaTime;
      if (this.state.settings.height + DEEP_OF_TRACKING < figure.position.y
      || figure.position.y < LEVEL_OF_TRACKING) {
        this.lostShape$.next(figure);
      }
    });
  }

}
