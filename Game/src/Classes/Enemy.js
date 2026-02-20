export class Enemy{
    constructor(game){
        // BASIC
        this.game = game;
        this.width = 60;
        this.height = 40;
        this.color = '#801DBE'

        // POSITION
        this.lane = Math.floor(this.game.rnd(1,4));
        this.x = this.game.canvasWidth;
        this.y = this.offset(this.game.canvasHeight, this.height, this.lane);
        this.speed = (this.y > this.game.canvasHeight / 2 ?
            this.game.rnd(5,7) * 2 : this.game.rnd(5,7));

        // TEXTURE
        this.image = (this.y > this.game.canvasHeight / 2 ?
            document.querySelector('#enemya-img') : document.querySelector('#enemyb-img'));

        // DELETION
        this.markedForDeletion = false;
    }

    update(){
        this.x -= this.speed;
    }

    draw(){
        // Texture off
        //this.game.ctx.fillStyle = this.color;
        //this.game.ctx.fillRect(this.x, this.y, this.width, this.height);

        // Texture on
        this.game.ctx.drawImage(
            this.image, 
            this.x,
            this.y)
    }

    isOffScreen(){ // Determines whether the object left the canvas
        return this.x + this.width < 0;
    }

    offset(canvasHeight, height, lane){ // Varies the position in the lane
        lane = lane * 2 - 1
        return ((canvasHeight / 8) * lane - height / 2) +
            (this.game.rnd(-1, 1) * (canvasHeight / 32));
    }
}