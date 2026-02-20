import { Bg } from "./Bg.js";
import { Bonus } from "./Bonus.js";
//import { Countdown } from "./Countdown.js";
import { Danger } from "./Danger.js";
import { Enemy } from "./Enemy.js";
import { Player } from "./Player.js";

export class Game{
    constructor(canvas){
        // CANVAS
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;
        this.ctx = canvas.getContext('2d');

        // PLAYER
        this.player = new Player(this);

        // INPUT
        this.inputKeys = {};
        this.setupInput();

        // ENEMIES
        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 20;

        // LINES
        this.lines = [];
        this.lineTimer = 0;
        this.lineInterval = 20;

        // BONUSES
        this.bonuses = [];
        this.bonusTimer = 0;
        this.bonusInterval = this.rnd(500, 700);

        // DANGERS
        this.dangers = [];
        this.dangerTimer = 0;
        this.dangerInterval = this.rnd(300, 500);

        // MUSIC
        this.music = document.querySelector('#music');
        this.playMusic = false;
        this.musicTurn();

        // OTHER
        this.gameOver = false;
        this.scoreDisplay = document.querySelector('#score-display');
        this.score = 0;
        this.highscoreDisplay = document.querySelector('#highscore-display');
        this.highScore = 0;
        this.fps = 120;
    }

    update(){
        // MUSIC
        this.musicToggle()


        // PLAYER
        this.player.update();


        // ENEMIES
        if (this.enemyTimer > this.enemyInterval){
            this.enemies.push(new Enemy(this));
            this.enemyTimer = 0;
        }
        else{
            this.enemyTimer++;
        }
        this.enemies.forEach(e =>{
            e.update();
            if (this.checkCollision(this.player, e)){
                this.gameOver = true;
            }
            if (e.isOffScreen()){
                e.markedForDeletion = true;
                this.score += 5;
                if (this.player.y > this.canvasHeight / 2){
                    this.score += 5;
                }
                this.scoreDisplay.innerHTML = 'Score: ' + this.score;
                if (this.score > this.highScore){
                    this.highScore = this.score;
                    this.highscoreDisplay.innerHTML = 'High Score: ' + this.score;
                }
            }
        })
        this.enemies = this.enemies.filter(e => !e.markedForDeletion);


        // LINES
        if (this.lineTimer > this.lineInterval){
            this.lines.push(new Bg(this));
            this.lineTimer = 0;
        }
        else{
            this.lineTimer++;
        }
        this.lines.forEach(l =>{
            l.update();
            if (l.isOffScreen()){
                l.markedForDeletion = true;
            }
        })
        this.lines = this.lines.filter(l => !l.markedForDeletion);


        // BONUSES
        if (this.bonusTimer > this.bonusInterval){
            this.bonuses.push(new Bonus(this));
            this.bonusTimer = 0;
            this.bonusInterval = this.rnd(500, 700);
        }
        else{
            this.bonusTimer++;
        }
        this.bonuses.forEach(b =>{
            b.update();
            if (b.isOffScreen()){
                b.markedForDeletion = true;
            }
        })
        this.bonuses = this.bonuses.filter(b => !b.markedForDeletion);


        // DANGERS
        if (this.dangerTimer > this.dangerInterval){
            this.dangers.push(new Danger(this));
            this.dangerTimer = 0;
            this.dangerInterval = this.rnd(300, 500);
        }
        else{
            this.dangerTimer++;
        }
        this.dangers.forEach(d =>{
            d.update();
            if (d.isOffScreen()){
                d.markedForDeletion = true;
            }
        })
        this.dangers = this.dangers.filter(d => !d.markedForDeletion);
    }

    draw(){
        // LINES
        this.lines.forEach(l =>{
            l.draw();
        });

        // ENEMIES
        this.enemies.forEach(e =>{
            e.draw();
        });

        // BONUSES
        this.bonuses.forEach(b => {
            b.draw();
        })

        // DANGERS
        this.dangers.forEach(d => {
            d.draw();
        })

        // PLAYER
        this.player.draw();

        // GAMEOVER
        if (this.gameOver){
            this.music.pause();
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
                this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

                this.ctx.fillStyle ="white";
                this.ctx.font = "40px Arial";
                this.ctx.textAlign = "center";
                this.ctx.fillText("GAME OVER",
                    this.canvasWidth/2,
                    this.canvasHeight/2)
        }
    }

    setupInput(){
        window.addEventListener('keydown', (e)=>{
            this.inputKeys[e.key] = true;
            if (this.gameOver && e.key == 'Enter'){
                this.restart();
            }
        })
        window.addEventListener('keyup', (e)=>{
            this.inputKeys[e.key] = false;
        })
    }

    musicToggle(){ // t
        if (this.inputKeys['m']){
            this.playMusic = false;
            this.music.pause();
        }
        if (this.inputKeys['n']){
            this.playMusic = true;
            this.music.play();
        }
    }

    restart(){
        this.score = 0;
        this.scoreDisplay.innerHTML = 'Pontszám '+ this.score;
        this.enemies = [];
        this.enemyTimer = 0;
        this.bonuses = [];
        this.dangers = [];
        this.gameOver = false;
        this.player = new Player(this);
        if (this.playMusic){
            this.music.load();
            this.music.play();
        }
        this.loop();
    }

    loop(){
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.update();
        this.draw();
        if (!this.gameOver){
            this.fpsCap(this.fps);
        }
    }

    start(){
        if (this.playMusic){
            this.music.load();
            this.music.play();
        }
        this.loop();
    }

    checkCollision(rect1, rect2){
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        )
    }

    offset(canvasHeight, height, lane){
        lane = lane * 2 - 1
        return ((canvasHeight / 8) * lane - height / 2) +
            (this.rnd(-1, 1) * (canvasHeight / 32));
    }

    fpsCap() {
        setTimeout(() => {
            requestAnimationFrame(()=> this.loop());
            }, 1000 / this.fps);
    }

    rnd(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
}