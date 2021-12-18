const canvas = document.getElementById('game_canvas');
import Controller from './Components/Controller.js';
import Game from './Components/Game.js';
import utils from './Components/Utils.js';
utils();
canvas.fitCanvas();
const game = new Game(canvas);

const player = {
    x: 500, y: 500,
    degree: 0,
    velocity: {
        x: 0,
        y: 0
    },
    radius: 25,
    controls: {
        up: false,
        down: false,
        right: false,
        left: false
    }
}

window.addEventListener('keydown', e => Controller.handleKeys(e, player));
window.addEventListener('keyup', e => Controller.handleKeys(e, player));
window.addEventListener('mousemove', e => Controller.handleMouse(e, player));

requestAnimationFrame(game.gameLoop.bind(game, player))