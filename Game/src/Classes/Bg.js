export class Bg{
    constructor(game){
        // BASIC
        this.game = game;
        this.width = this.game.canvasWidth;
        this.height = 8;
        this.color = '#546FF0'

        // CONTINOUS LINES
        this.topY = 5;
        this.mdY = this.game.canvasHeight / 2 - this.height / 2;
        this.btmY = this.game.canvasHeight - this.height -5;

        // SMALL LINES
        this.lineWidth = 80;
        this.lineX = this.game.canvasWidth;
        this.lineTopY = this.game.canvasHeight / 4 - this.height / 2;
        this.lineBtmY = (this.game.canvasHeight / 4)*3 - this.height / 2;
        this.speed = 10;

        // DELETION
        this.markedForDeletion = false;
    }

    update(){
        this.lineX -= this.speed;
    }

    draw(){
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.fillRect(0, this.topY, this.width, this.height);
        this.game.ctx.fillRect(0, this.mdY, this.width, this.height);
        this.game.ctx.fillRect(0, this.btmY, this.width, this.height);
        this.game.ctx.fillRect(this.lineX, this.lineTopY, this.lineWidth, this.height);
        this.game.ctx.fillRect(this.lineX, this.lineBtmY, this.lineWidth, this.height);

        // No motion sickness
        //this.game.ctx.fillRect(0, this.lineTopY, this.width, this.height);
        //this.game.ctx.fillRect(0, this.lineBtmY, this.width, this.height);
    }

    isOffScreen(){ // Determines whether the object left the canvas
        return this.lineX + this.lineWidth < 0;
    }
}