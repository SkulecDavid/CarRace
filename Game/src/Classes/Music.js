export class Music{
    constructor(game){
        this.game = game;
        this.music = document.querySelector('#music');
        this.playMusic = false;
    }

    loadMusic(){
        this.music.load();
    }

    startMusic(){
        this.music.play();
    }

    pauseMusic(){
        this.music.pause();
    }

    musicToggle(){ // Toggles music
        if (this.game.inputKeys['m']){
            this.playMusic = false;
            this.pauseMusic();
        }
        if (this.game.inputKeys['n']){
            this.playMusic = true;
            this.startMusic();
        }
    }
}