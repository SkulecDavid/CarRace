export class Sound{
    constructor(game){
        this.game = game;
        this.playSound = false;

        this.music = document.querySelector('#music');
        this.crashSound = document.querySelector('#crash-sound');
        this.hitSound = document.querySelector('#hit-sound');
        this.collectSound = document.querySelector('#collect-sound');
    }

    loadMusic(){
        if (this.playSound){
            this.music.load();
        }
    }

    startMusic(){
        if (this.playSound){
            this.music.play();
        }
    }

    pauseMusic(){
        this.music.pause();
    }

    crash(){
        if (this.playSound){
            this.crashSound.load();
            this.crashSound.play();
        }
    }

    hit(){
        if (this.playSound){
            this.hitSound.load();
            this.hitSound.play();
        }
    }

    collect(){
        if (this.playSound){
            this.collectSound.load();
            this.collectSound.play();
        }
    }

    musicToggle(){ // Toggles music
        if (this.game.inputKeys['m']){
            this.playSound = false;
            this.pauseMusic();
        }
        if (this.game.inputKeys['n']){
            this.playSound = true;
            this.startMusic();
        }
    }
}