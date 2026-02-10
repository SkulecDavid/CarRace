export class Bg{
    constructor(game){
        this.game = game;
        this.width = this.game.canvasWidth;
        this.height = 10;
        this.color = '#546FF0'
        this.speed = 10; //

        this.topY = 5;
        this.mdY = this.game.canvasHeight / 2 - this.height / 2;
        this.btmY = this.game.canvasHeight - this.height -5;

        this.lineWidth = 80;
        this.lineX = this.game.canvasWidth;
        this.lineTopY = this.game.canvasHeight / 4 - this.height / 2;
        this.lineBtmY = (this.game.canvasHeight / 4)*3 - this.height / 2;

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

        // zero motion sickness
        //this.game.ctx.fillRect(0, this.lineTopY, this.width, this.height);
        //this.game.ctx.fillRect(0, this.lineBtmY, this.width, this.height);
    }

    isOffScreen(){
        return this.lineX + this.lineWidth < 0;
    }
}