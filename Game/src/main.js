import './style.css'
import { Game } from './Classes/Game.js'

const canvas = document.querySelector('#game-canvas')

canvas.width = 800;
canvas.height = 450;

window.addEventListener('load', ()=>{
    const game = new Game(canvas);
    game.start();
})