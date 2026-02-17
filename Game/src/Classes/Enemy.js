export class Enemy{
    constructor(game){
        this.game = game;
        this.width = 60;
        this.height = 40;
        this.color = '#801DBE'

        this.lane = Math.floor(this.game.rnd(1,4));
        this.x = this.game.canvasWidth;
        this.y = this.game.offset(this.game.canvasHeight, this.height, this.lane)
        this.speed = (this.y > this.game.canvasHeight / 2 ?
            this.game.rnd(5,7) * 2 : this.game.rnd(5,7)); // 

        this.markedForDeletion = false;

        this.image = (this.y > this.game.canvasHeight / 2 ?
            document.querySelector('#enemya-img') : document.querySelector('#enemyb-img'));
        //this.imageA = document.querySelector('#enemya-img')
        //this.imageB = document.querySelector('#enemyb-img')
    }

    update(){
        this.x -= this.speed;
    }

    draw(){
        //this.game.ctx.fillStyle = this.color;
        //this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.drawImage(
            this.image, 
            this.x,
            this.y)

    }

    isOffScreen(){
        return this.x + this.width < 0;
    }
}