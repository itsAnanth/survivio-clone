const canvas = document.getElementById('game_canvas');
import Controller from './Components/Controller.js';
import Game from './Components/Game.js';
import Player from './Components/Player.js';
import utils from './Components/Utils.js';
utils();
canvas.fitCanvas();
const game = new Game(canvas);

const player = new Player(500, 500, canvas);

window.addEventListener('keydown', e => Controller.handleKeys(e, player));
window.addEventListener('keyup', e => Controller.handleKeys(e, player));
window.addEventListener('mousemove', e => Controller.handleMouse(e, player));
window.addEventListener('click', (e) => Controller.handleClick(e, player))
requestAnimationFrame(game.gameLoop.bind(game, player))