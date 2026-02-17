import { Bg } from "./Bg.js";
import { Enemy } from "./Enemy.js";
import { Player } from "./Player.js";

export class Game{
    constructor(canvas){
        this.canvas = canvas;
        this.canvasWidth = this.canvas.width;
        this.canvasHeight = this.canvas.height;

        this.ctx = canvas.getContext('2d');

        this.player = new Player(this);

        this.inputKeys = {};
        this.setupInput();

        this.enemies = [];
        this.enemyTimer = 0;
        this.enemyInterval = 20; //

        this.lines = [];
        this.lineTimer = 0;
        this.lineInterval = 20; //

        this.gameOver = false;

        this.scoreDisplay = document.querySelector('#score-display');
        this.score = 0;

        this.fps = 60;
    }

    update(){
        this.player.update();

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
                //console.log('BUMM');
                this.gameOver = true;
            }

            if (e.isOffScreen()){
                e.markedForDeletion = true;
                this.score += 5;
                if (this.player.y > this.canvasHeight / 2){
                    this.score += 5;
                }
                this.scoreDisplay.innerHTML = 'Score: ' + this.score;
            }
        })

        //console.log(this.enemies);
        this.enemies = this.enemies.filter(e => !e.markedForDeletion);

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

        //console.log(this.lines);
        this.lines = this.lines.filter(l => !l.markedForDeletion);
    }

    draw(){
        this.lines.forEach(l =>{
            l.draw();
        });

        this.enemies.forEach(e =>{
            e.draw();
        });

        this.player.draw();

        if (this.gameOver){
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
                this.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);

                this.ctx.fillStyle ="white";
                this.ctx.font = "40px Arial";
                this.ctx.textAlign = "center";
                this.ctx.fillText("Játék vége",
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

    restart(){
        this.score = 0;
        this.scoreDisplay.innerHTML = 'Pontszám '+ this.score;
        this.enemies = [];
        this.enemyTimer = 0;
        this.gameOver = false;
        this.player = new Player(this);
        this.loop();
    }

    loop(){
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.update();
        this.draw();
        if (!this.gameOver){
            this.animate(this.fps);
        }
    }

    animate() {
        setTimeout(() => {
            requestAnimationFrame(()=> this.loop());
            }, 100 / this.fps);
    }

    start(){
        this.loop();
    }

    rnd(min, max) {
        return Math.random() * (max - min + 1) + min;
    }
    
    offset(canvasHeight, height, lane){
        lane = lane * 2 - 1
        return ((canvasHeight / 8) * lane - height / 2) +
            (this.rnd(-1, 1) * (canvasHeight / 32));
    }

    checkCollision(rect1, rect2){
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        )
    }
}