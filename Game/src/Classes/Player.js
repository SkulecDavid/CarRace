export class Player{
    constructor(game){
        this.game = game;
        this.width = 60;
        this.height = 40;
        this.color = '#FA50A7'
        this.speed = 5; //

        this.x = 10;
        this.y = this.game.canvasHeight / 2 - this.height / 2;

        this.image = document.querySelector('#player-img')
    }

    update(){
        if (this.game.inputKeys['ArrowUp'] && this.y > 0 &&
            !this.game.inputKeys['ArrowRight'] && !this.game.inputKeys['ArrowLeft'])
            this.y -= this.speed;
        if (this.game.inputKeys['ArrowDown'] && this.y + this.height < this.game.canvasHeight &&
            !this.game.inputKeys['ArrowRight'] && !this.game.inputKeys['ArrowLeft'])
            this.y += this.speed;
        if (this.game.inputKeys['ArrowLeft'] && this.x > 0 &&
            !this.game.inputKeys['ArrowUp'] && !this.game.inputKeys['ArrowDown'])
            this.x -= this.speed;
        if (this.game.inputKeys['ArrowRight'] && this.x + this.width < this.game.canvasWidth &&
            !this.game.inputKeys['ArrowUp'] && !this.game.inputKeys['ArrowDown'])
            this.x += this.speed;

        // átlós mozgás
        const diagonalSpeed = this.speed/Math.SQRT2;
        if (this.game.inputKeys['ArrowRight'] && this.x + this.width < this.game.canvasWidth &&
            this.game.inputKeys['ArrowUp'] && this.y > 0){
                this.x += diagonalSpeed;
                this.y -= diagonalSpeed;}
        if (this.game.inputKeys['ArrowRight'] && this.x + this.width < this.game.canvasWidth &&
            this.game.inputKeys['ArrowDown'] && this.y + this.height < this.game.canvasHeight){
                this.x += diagonalSpeed;
                this.y += diagonalSpeed;}
        if (this.game.inputKeys['ArrowLeft'] && this.x > 0 &&
            this.game.inputKeys['ArrowUp'] && this.y > 0){
                this.x -= diagonalSpeed;
                this.y -= diagonalSpeed;}
        if (this.game.inputKeys['ArrowLeft'] && this.x > 0 &&
            this.game.inputKeys['ArrowDown'] && this.y + this.height < this.game.canvasHeight){
                this.x -= diagonalSpeed;
                this.y += diagonalSpeed;}
    }

    draw(){
        //this.game.ctx.fillStyle = this.color;
        //this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.game.ctx.drawImage(
            this.image,
            this.x,
            this.y
        )
    }
}