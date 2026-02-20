export class Bonus{
    constructor(game){
        // BASIC
        this.game = game;
        this.width = 40;
        this.height = 40;
        this.color = '#0F0'

        // POSITION
        this.x = this.game.canvasWidth;
        this.y = this.game.rnd(0, this.game.canvasHeight - this.height);
        this.speed = 10;

        // DELETION
        this.markedForDeletion = false;
    }

    update(){
        this.x -= this.speed;
    }

    draw(){
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    isOffScreen(){ // Determines whether the object left the canvas
        return this.x + this.width < 0;
    }
}