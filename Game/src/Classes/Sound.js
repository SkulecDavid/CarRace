export class Sound{
    constructor(game){
        // BASIC
        this.game = game;
        this.playSound = true;

        // FILES
        this.music = document.querySelector('#music');
        this.crashSound = document.querySelector('#crash-sound');
        this.hitSound = document.querySelector('#hit-sound');
        this.collectSound = document.querySelector('#collect-sound');
    }

    loadMusic(){ // Restarts music
        if (this.playSound){
            this.music.load();
        }
    }

    startMusic(){ // Resumes music
        if (this.playSound){
            this.music.play();
        }
    }

    pauseMusic(){ // Stops music
        this.music.pause();
    }

    crash(){ // Plays crash sound
        if (this.playSound){
            this.crashSound.load();
            this.crashSound.play();
        }
    }

    hit(){ // Plays sound when traffic cone hit
        if (this.playSound){
            this.hitSound.load();
            this.hitSound.play();
        }
    }

    collect(){ // Plays sound when fuel collected
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