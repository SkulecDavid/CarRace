export class Player{
    constructor(game){
        // BASIC
        this.game = game;
        this.width = 60;
        this.height = 40;
        this.color = '#FA50A7';

        // POSITION
        this.x = 10;
        this.y = this.game.canvasHeight / 2 - this.height / 2;
        this.speed = 5;

        // TEXTURE
        this.image = document.querySelector('#player-img');
    }

    update(){
        // Movement
        if (this.game.inputKeys['ArrowUp'] && this.y > 0 &&
            !this.game.inputKeys['ArrowRight'] && !this.game.inputKeys['ArrowLeft']){
            this.y -= this.speed;}
        if (this.game.inputKeys['ArrowDown'] && this.y + this.height < this.game.canvasHeight &&
            !this.game.inputKeys['ArrowRight'] && !this.game.inputKeys['ArrowLeft']){
            this.y += this.speed;}
        if (this.game.inputKeys['ArrowLeft'] && this.x > 0 &&
            !this.game.inputKeys['ArrowUp'] && !this.game.inputKeys['ArrowDown']){
            this.x -= this.speed;}
        if (this.game.inputKeys['ArrowRight'] && this.x + this.width < this.game.canvasWidth &&
            !this.game.inputKeys['ArrowUp'] && !this.game.inputKeys['ArrowDown']){
            this.x += this.speed;}

        // Diagonal movement
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
        // Texture off
        //this.game.ctx.fillStyle = this.color;
        //this.game.ctx.fillRect(this.x, this.y, this.width, this.height);

        // Texture on
        this.game.ctx.drawImage(
            this.image,
            this.x,
            this.y
        )
    }
}