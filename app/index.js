import './style.css';
import Game from './Game';
import World from './World';


window.world = mew World();

window.game = new Game().init().start();
