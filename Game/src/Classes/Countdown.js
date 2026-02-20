// WIP
export class Countdown{
    constructor(game) {
        this.game = game;
        
        this.color = "white";
        this.font = "40px Arial"; 
    }

    update(){
        console.log("ok");
        
        for (let i = 3; i > 0; i--){
            
            setTimeout(() => {
                console.log("ok");
                this.game.ctx.fillText(`${i}`,
                    this.game.canvasWidth/2,
                    this.game.canvasHeight/2)
            }, 5000);
        }
        setTimeout(() => {
            this.game.ctx.fillText("GO!",
                this.game.canvasWidth/2,
                this.game.canvasHeight/2)
            }, 5000);
        this.game.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }
    
    draw(){
        this.game.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        this.game.ctx.fillRect(0,0,this.canvasWidth,this.canvasHeight);
        this.game.ctx.fillStyle = this.color;
        this.game.ctx.font = this.font;
        this.game.ctx.textAlign = "center";
    }
}